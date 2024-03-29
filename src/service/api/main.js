'use strict';

const {Router} = require(`express`);

const {
  getAllPublicationsMiddleware,
  getPublicationByIdMiddleware,
  getAllCategoriesMiddleware,
  setNewPublicationMiddleware,
  updatePublicationMiddleware,
  deletePublicationMiddleware,
  getCommentsPublicationMiddleware,
  deleteCommentMiddleware,
  addNewCommentMiddleware,
  getSearchedMiddleware,
  getCategoryDataById,
  setNewUser,
  checkAuthentification,
} = require(`../common/middlewares`);

const commentValidationScheme = require(`../validation/schemes/comment-validator`);
const publicationValidationScheme = require(`../validation/schemes/publication-validator`);
const paramsValidationScheme = require(`../validation/schemes/params-validatior`);
const newUserValidationScheme = require(`../validation/schemes/new-user-validator`);

const {
  commentValidationMiddleware,
  publicationValidationMiddleware,
  paramsValidatorMiddleware,
  newUserDataValidationMiddleware,
} = require(`../validation/middlewares`);

const {getLogger} = require(`../lib/logger`);

const mainApi = (app, mainService) => {
  const logger = getLogger(`main`);

  const apiRouter = new Router();
  app.use(`/api`, apiRouter);

  apiRouter.get(`/articles`, getAllPublicationsMiddleware(mainService), (req, res) => {
    const {allPublications} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    logger.info(`Status code is 200`);
    res.status(200).json(allPublications);
  });

  apiRouter.get(`/articles/:articleId`,
      paramsValidatorMiddleware(paramsValidationScheme),
      getPublicationByIdMiddleware(mainService),
      (req, res) => {
        const {publicationById} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(publicationById);
      });

  apiRouter.get(`/categories`, getAllCategoriesMiddleware(mainService), (req, res) => {
    const {allCategories} = req;
    logger.debug(`Request on route ${req.originalUrl}`);

    logger.info(`Status code is 200`);
    res.status(200).json(allCategories);
  });

  apiRouter.post(`/articles`,
      publicationValidationMiddleware(publicationValidationScheme),
      setNewPublicationMiddleware(mainService),
      (req, res) => {
        const {newPublication} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(newPublication);
      });

  apiRouter.put(`/articles/:articleId`,
      paramsValidatorMiddleware(paramsValidationScheme),
      publicationValidationMiddleware(publicationValidationScheme),
      updatePublicationMiddleware(mainService),
      (req, res) => {
        const {updatedPublication} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(updatedPublication);
      }
  );

  apiRouter.delete(`/articles/:articleId`,
      paramsValidatorMiddleware(paramsValidationScheme),
      deletePublicationMiddleware(mainService),
      (req, res) => {
        const {deleteResult} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(deleteResult);
      });

  apiRouter.get(`/articles/:articleId/comments`,
      paramsValidatorMiddleware(paramsValidationScheme),
      getCommentsPublicationMiddleware(mainService),
      (req, res) => {
        const {commentsPublication} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(commentsPublication);
      });

  apiRouter.post(`/articles/:articleId/comments`,
      paramsValidatorMiddleware(paramsValidationScheme),
      commentValidationMiddleware(commentValidationScheme),
      addNewCommentMiddleware(mainService),
      (req, res) => {
        const {newComment} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(newComment);
      }
  );

  apiRouter.delete(`/articles/:articleId/comments/:commentId`,
      paramsValidatorMiddleware(paramsValidationScheme),
      deleteCommentMiddleware(mainService),
      (req, res) => {
        const {deleteResult} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(deleteResult);
      });

  apiRouter.get(`/articles/category/:categoryId`,
      paramsValidatorMiddleware(paramsValidationScheme),
      getCategoryDataById(mainService),
      (req, res) => {
        const {categoryData} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(categoryData);
      });

  apiRouter.get(`/search`, getSearchedMiddleware(mainService), (req, res) => {
    const {searchResult} = req;
    logger.debug(`Request on route ${req.originalUrl}`);

    logger.info(`Status code is 200`);
    return res.status(200).json(searchResult);
  });

  apiRouter.post(`/user`,
      newUserDataValidationMiddleware(newUserValidationScheme),
      setNewUser(mainService),
      (req, res) => {
        const {sameUserError} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(!sameUserError ? 200 : 400).json({sameUserError});
      });

  apiRouter.post(`/authentification`,
      checkAuthentification(mainService),
      (req, res) => {
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(req.authData);
      });
};

module.exports = mainApi;
