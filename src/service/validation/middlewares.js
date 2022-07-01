'use strict';

module.exports = {
  commentsValidationMiddleware: (scheme) => async (req, res, next) => {
    
    
    const {error} = await scheme.validateAsync();


  },
};
