'use strict';

const Joi = require(`joi`);

const {PARAMS_ERROR} = require(`../consts`);

module.exports = Joi
.array()
  .items(Joi
    .string()
    .custom((value) => isNaN(Number(value)))
    .messages({
      [`string.base`]: PARAMS_ERROR,
    })
  );
