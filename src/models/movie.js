const mongoose = require('mongoose');
const { isUrl } = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [isUrl, 'Неккоректная ссылка'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [isUrl, 'Неккоректная ссылка'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [isUrl, 'Неккоректная ссылка'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movies', movieSchema);
