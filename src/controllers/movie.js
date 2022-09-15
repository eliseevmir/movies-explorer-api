const mongoose = require('mongoose');
const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
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
    trailerLink,
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
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  }).then((movie) => {
    res.status(STATUS_CODE_200).send(movie);
  }).catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Некорректные данные'));
    } else {
      next(err);
    }
  });
};

module.exports.deleteMovie = (req, res, next) => {
  const idMovie = req.params._id;
  const userId = req.user._id;
  Movie.findById(idMovie)
    .orFail(new NotFoundError('Фильм с указанным _id не найден'))
    .then((movie) => {
      const owner = movie.owner.valueOf();

      if (owner !== userId) {
        throw new ForbiddenError('Фильм добавлен другим пользователем, удалить нельзя');
      }

      return Movie.findByIdAndRemove(idMovie)
        .then((movieDate) => {
          res.status(STATUS_CODE_200).send(movieDate);
        });
    }).catch(next);
};
