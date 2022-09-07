const { celebrate, Joi } = require('celebrate');
const { EMAILREGEXP } = require('../utils/constants');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Только строка',
        'string.empty': 'Поле не должно быть пустым',
        'string.min': 'В поле "name" должго быть минимум 2 символа',
        'string.max': 'В поле "name" должно быть максимум 30 символов',
        'any.required': 'Поле обязательное для заполнения',
      }),
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
