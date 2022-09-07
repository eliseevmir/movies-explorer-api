const { celebrate, Joi } = require('celebrate');
const { LINKREGEXP } = require('../utils/constants');

module.exports = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.base': 'Только строка',
      'string.empty': 'Поле не должно быть пустым',
      'any.required': 'Поле обязательное для заполнения',
    }),
    director: Joi.string().required().messages({
      'string.base': 'Только строка',
      'string.empty': 'Поле не должно быть пустым',
      'any.required': 'Поле обязательное для заполнения',
    }),
    duration: Joi.number().required().messages({
      'number.base': 'Только число',
      'any.required': 'Поле обязательное для заполнения',
    }),
    year: Joi.number().required().messages({
      'number.base': 'Только число',
      'any.required': 'Поле обязательное для заполнения',
    }),
    description: Joi.string().required().messages({
      'string.base': 'Только строка',
      'string.empty': 'Поле не должно быть пустым',
      'any.required': 'Поле обязательное для заполнения',
    }),

    image: Joi.string().required().pattern(new RegExp(LINKREGEXP)).messages({
      'string.pattern.base': 'Некорректная ссылка',
      'string.empty': 'Поле не должно быть пустым',
      'any.required': 'Email обязателен',
    }),
    trailer: Joi.string().required().pattern(new RegExp(LINKREGEXP)).messages({
      'string.pattern.base': 'Некорректная ссылка',
      'string.empty': 'Поле не должно быть пустым',
      'any.required': 'Email обязателен',
    }),
    thumbnail: Joi.string()
      .required()
      .pattern(new RegExp(LINKREGEXP))
      .messages({
        'string.pattern.base': 'Некорректная ссылка',
        'string.empty': 'Поле не должно быть пустым',
        'any.required': 'Email обязателен',
      }),

    movieId: Joi.number().required().messages({
      'number.base': 'Только число',
      'any.required': 'Поле обязательное для заполнения',
    }),
    nameRU: Joi.string().required().messages({
      'string.base': 'Только строка',
      'string.empty': 'Поле не должно быть пустым',
      'any.required': 'Поле обязательное для заполнения',
    }),
    nameEN: Joi.string().required().messages({
      'string.base': 'Только строка',
      'string.empty': 'Поле не должно быть пустым',
      'any.required': 'Поле обязательное для заполнения',
    }),
  }),
});
