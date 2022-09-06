const mongoose = require('mongoose');
const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { STATUS_CODE_200 } = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    await Movie.find({})
      .then((movies) => {
        res.status(STATUS_CODE_200).send(movies);
      });
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  }).then((movie) => {
    res.status(STATUS_CODE_200).send(movie);
  }).catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден'))
    .then((movie) => {
      res.status(STATUS_CODE_200).send(movie);
    }).catch(next);
};
