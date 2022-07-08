'use strict';

const Joi = require(`joi`);

const {PARAMS_ERROR} = require(`../consts`);

module.exports = Joi
.array()
  .items(Joi
    .string()
    .custom((value, helper) => {
      if (isNaN(Number(value))) {
        return helper.error(`string.invalid`);
      }

      return value;
    })
    .messages({
      [`string.invalid`]: PARAMS_ERROR,
    })
  );
