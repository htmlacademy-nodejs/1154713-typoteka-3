'use strict';

const Joi = require(`joi`);

const {
  TITLE_EMPTY,
  TITLE_MAX_LENGTH_ERROR,
  TITLE_MIN_LENGTH_ERROR,
  PICTURE_EXTENCION_ERROR,
  CATEGORIES_MIN,
  CATEGORIES_REQUIRED,
  DATA_STRING_REQUIRED,
  ANNOUNCE_EMPTY,
  ANNOUNCE_MAX_LENGTH_ERROR,
  ANNOUNCE_MIN_LENGTH_ERROR,
  FULL_TEXT_MAX,
} = require(`../consts`);


/*Заголовок. Обязательное поле. Минимум 30 символов. Максимум 250;
Фотография. Необязательное поле. Позволяет загружать изображения в формате jpg и png;
Дата публикации (дата). Обязательное поле. По умолчанию текущая дата;
Категории. Обязательно для выбора одна категория;
Анонс публикации. Обязательное поле. Минимум 30 символов. Максимум 250;
Полный текст публикации. Необязательное поле. Максимум 1000 символов.

user_id: 1,
title: 'Как перестать беспокоиться и начать жить',
picture: null,
categories: [ 'IT', 'Без рамки' ],
announce: 'Из под его пера вышло 8 платиновых альбомов.',
full_text: 'Первая большая ёлка была установлена только в 1938 году.',
publication_date: '2020-10-21'*/

module.exports = Joi.object({
  [`user_id`]: Joi
    .number()
    .required(),

  title: Joi
    .string()
    .min(30)
    .max(250)
    .required()
    .messages({
      [`string.min`]: TITLE_MIN_LENGTH_ERROR,
      [`string.max`]: TITLE_MAX_LENGTH_ERROR,
      [`string.empty`]: TITLE_EMPTY,
    }),

  [`publication_date`]: Joi
    .string()
    .required()
    .messages({
      [`string.empty`]: DATA_STRING_REQUIRED,
    }),

  picture: Joi
    .string()
    .regex(/\.(jpg|png)$/)
    .allow(null)
    .messages({
      [`string.pattern.base`]: PICTURE_EXTENCION_ERROR,
    }),

  categories: Joi
    .array()
    .required()
    .min(1)
    .items(Joi.string())
    .messages({
      [`array.min`]: CATEGORIES_MIN,
      [`array.includesRequiredBoth`]: CATEGORIES_REQUIRED,
    }),

  announce: Joi
    .string()
    .min(30)
    .max(250)
    .required()
    .messages({
      [`string.min`]: ANNOUNCE_MIN_LENGTH_ERROR,
      [`string.max`]: ANNOUNCE_MAX_LENGTH_ERROR,
      [`string.empty`]: ANNOUNCE_EMPTY,
    }),

  [`full_text`]: Joi
    .string()
    .max(1000)
    .min(0)
    .messages({
      [`string.max`]: FULL_TEXT_MAX,
    }),
});
