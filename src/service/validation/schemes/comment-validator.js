'use strict';

const Joi = require(`joi`);

const {COMMENT_ERROR} = require(`../consts`);

module.exports = Joi.object({
  commentText: Joi.string().min(20).required().messages({
    minStringError: COMMENT_ERROR,
  }),
});
