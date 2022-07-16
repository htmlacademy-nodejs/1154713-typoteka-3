'use strict';

const Joi = require(`joi`);

const {
  EMAIL_EMPTY_ERROR,
  USER_NAME_EMPTY_ERROR,
  INCORRECT_USER_NAME,
  INCORRECT_USER_SURNAME,
  PASSWORD_EMPTY,
  PASSWORD_MIN_LENGTH_ERROR,
  RETRY_PASSWORD_EMPTY,
  EMIAL_INCORRECT_ERROR,
  IDENTITY_RETRY_PASSWORD_ERROR,
} = require(`../consts`);

module.exports = Joi.object({
  email: Joi
    .string()
    .email()
    .required()
    .messages({
      [`string.empty`]: EMAIL_EMPTY_ERROR,
      [`string.email`]: EMIAL_INCORRECT_ERROR,
    }),
  [`user_name`]: Joi
    .string()
    .required()
    .regex(/^[а-яёЁА-Яa-zA-Z]+$/)
    .messages({
      [`string.empty`]: USER_NAME_EMPTY_ERROR,
      [`string.pattern.base`]: INCORRECT_USER_NAME,
    }),
  [`user_surname`]: Joi
    .string()
    .required()
    .regex(/^[а-яёЁА-Яa-zA-Z]+$/)
    .messages({
      [`string.empty`]: USER_NAME_EMPTY_ERROR,
      [`string.pattern.base`]: INCORRECT_USER_SURNAME,
    }),
  [`user_password`]: Joi
    .string()
    .required()
    .min(6)
    .messages({
      [`string.empty`]: PASSWORD_EMPTY,
      [`string.min`]: PASSWORD_MIN_LENGTH_ERROR,
    }),
  [`retry_password`]: Joi
    .string()
    .min(6)
    .valid(Joi.ref(`user_password`))
    .required()
    .messages({
      [`any.only`]: IDENTITY_RETRY_PASSWORD_ERROR,
      [`string.empty`]: RETRY_PASSWORD_EMPTY,
      [`string.min`]: PASSWORD_MIN_LENGTH_ERROR,
    }),
  avatar: Joi
    .optional(),
});
