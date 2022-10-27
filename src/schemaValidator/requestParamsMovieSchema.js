const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  params: Joi.object().keys({
    _id: Joi.number().positive().required()
      .messages({
        'number.base': 'Только строка',
        'number.empty': 'Не пустая строка',
        'any.required': 'Поле обязательное',
        'number.positive': 'Целое натуральное число',
      }),
  }),
});
