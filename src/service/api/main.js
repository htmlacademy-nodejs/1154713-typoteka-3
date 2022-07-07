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
} = require(`../common/middlewares`);

const commentValidationScheme = require(`../validation/schemes/comment-validator`);
const publicationValidationScheme = require(`../validation/schemes/publication-validator`);

const {
  commentValidationMiddleware,
  publicationValidationMiddleware,
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

  apiRouter.get(`/articles/:articleId`, getPublicationByIdMiddleware(mainService), (req, res) => {
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




      setNewPublicationMiddleware(mainService),

      (req, res) => {
        const {newPublication} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(newPublication);
      });




  apiRouter.put(`/articles/:articleId`,




      publicationValidationMiddleware(publicationValidationScheme),




      updatePublicationMiddleware(mainService),
      (req, res) => {
        const {updatedPublication} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(updatedPublication);
      }
  );





  apiRouter.delete(`/articles/:articleId`, deletePublicationMiddleware(mainService), (req, res) => {
    const {deleteResult} = req;
    logger.debug(`Request on route ${req.originalUrl}`);

    logger.info(`Status code is 200`);
    return res.status(200).json(deleteResult);
  });

  apiRouter.get(`/articles/:articleId/comments`, getCommentsPublicationMiddleware(mainService), (req, res) => {
    const {commentsPublication} = req;
    logger.debug(`Request on route ${req.originalUrl}`);

    logger.info(`Status code is 200`);
    return res.status(200).json(commentsPublication);
  });




  apiRouter.post(`/articles/:articleId/comments`,
      commentValidationMiddleware(commentValidationScheme),
      addNewCommentMiddleware(mainService),
      (req, res) => {
        const {newComment} = req;
        logger.debug(`Request on route ${req.originalUrl}`);

        logger.info(`Status code is 200`);
        return res.status(200).json(newComment);
      }
  );





  apiRouter.delete(`/articles/:articleId/comments/:commentId`, deleteCommentMiddleware(mainService), (req, res) => {
    const {deleteResult} = req;
    logger.debug(`Request on route ${req.originalUrl}`);

    logger.info(`Status code is 200`);
    return res.status(200).json(deleteResult);
  });

  apiRouter.get(`/articles/category/:categoryId`, getCategoryDataById(mainService), (req, res) => {
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
};

module.exports = mainApi;
