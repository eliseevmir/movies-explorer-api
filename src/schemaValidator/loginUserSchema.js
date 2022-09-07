const { celebrate, Joi } = require('celebrate');
const { EMAILREGEXP } = require('../utils/constants');

module.exports = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .pattern(new RegExp(EMAILREGEXP))
      .messages({
        'string.pattern.base': 'Некорректный email',
        'string.empty': 'Поле не должно быть пустым',
        'any.required': 'Email обязателен',
      }),
    password: Joi.string().required()
      .messages({
        'string.base': 'Необходимо ввести пароль',
        'string.empty': 'Поле не должно быть пустым',
        'any.required': 'Пароль обязателен',
      }),
  }),
});
