'use strict';

const {ARGUMENT_ERROR} = require(`../common/consts`);

module.exports = {
  commentValidationMiddleware: (scheme) => async (req, res, next) => {
    const {body} = req;

    try {
      await scheme.validateAsync(body);
    } catch ({details}) {
      res.status(ARGUMENT_ERROR).json(details[0].message);
      return;
    }

    next();
  },
};
