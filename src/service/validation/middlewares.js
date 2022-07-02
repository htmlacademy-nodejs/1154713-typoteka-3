'use strict';

const {ARGUMENT_ERROR} = require(`../common/consts`);

module.exports = {
  commentValidationMiddleware: (scheme) => async (req, res, next) => {
    const {body} = req;

    try {
      await scheme.validateAsync(body);
    } catch (error) {

      console.log('ERRRRR~~~~~', error);

      next(new Error(400));

      return new Error(400);

      //res.redirect(`/articles/${req.params.id}`);



      //res.status(400).json([]);
      
      

      /*res.status(ARGUMENT_ERROR).json({
        message: details.map((errorDescription) => errorDescription.message),
        data: body
      });



      return;*/

    }

    // return next() ????
    next();
  },
};
