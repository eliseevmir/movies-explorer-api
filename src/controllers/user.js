const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

const { STATUS_CODE_200, STATUS_CODE_201 } = require('../utils/constants');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnAuthorizedError = require('../errors/UnAuthorized');
const ConflictingRequestError = require('../errors/ConflictingRequestError');

module.exports.createUser = (req, res, next) => {
  const { name, password, email } = req.body;

  return bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, password: hash, email })
      .then((user) => {
        // eslint-disable-next-line no-shadow
        const { password, ...userData } = user._doc;
        return res.status(STATUS_CODE_201).send(userData);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictingRequestError('Пользователь с указанным email существует'));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError('Не вернные данные'));
        }
        return next(err);
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findById({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnAuthorizedError('Пользователь не найден или введен неверный пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnAuthorizedError('Пользователь не найден или введен неверный пароль'));
        }

        const payload = { _id: user._Id };
        const token = jwt.sign(
          payload,
          NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
          { expiresIn: '7d' },
        );

        return res.send({ token });
      });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.status(STATUS_CODE_200).send(user);
    }).catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate({ _id }, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.status(STATUS_CODE_200).send(user);
    }).catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Не вернные данные'));
      } else {
        next(err);
      }
    });
};
