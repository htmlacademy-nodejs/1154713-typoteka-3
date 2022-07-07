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
