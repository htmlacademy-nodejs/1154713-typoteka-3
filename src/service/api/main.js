'use strict';

const {Router} = require(`express`);

const {SERVER_SERVICE_ERROR, ANSWER_ERROR, ARGUMENT_ERROR, BodyArguments: {Category}} = require(`../cli/consts`);
const {hasNeededBodyKeys} = require(`../cli/utils`);
const {getLogger} = require(`../lib/logger`);

const mainApi = (app, mainService) => {
  const logger = getLogger(`main`);

  const apiRouter = new Router();
  app.use(`/api`, apiRouter);

  apiRouter.get(`/articles`, (req, res, next) => {
    logger.debug(`Request on route ${req.originalUrl}`);

    try {
      logger.info(`Status code is 200`);
      res.status(200).json(mainService.getAll());
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  });

  apiRouter.get(`/articles/:articleId`, (req, res, next) => {
    const {params: {articleId}} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    const result = mainService.find(articleId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(result);
  });

  apiRouter.get(`/categories`, (req, res) => {
    logger.debug(`Request on route ${req.originalUrl}`);

    logger.info(`Status code is 200`);
    res.status(200).send(mainService.getCategories());
  });

  apiRouter.get(`/articles/:articleId/comments`, (req, res, next) => {
    const {params: {articleId}} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    const result = mainService.find(articleId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(result.comments);
  });

  apiRouter.get(`/search`, (req, res, next) => {
    const {body: {search}} = req;


    console.log(`query~~~~~~~~~~~~~~`);
    console.log(search);


    logger.debug(`Request on route ${req.originalUrl}`);

    const result = mainService.getSearchedData(search);

    if (!result.length) {
      return next(new Error(ANSWER_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(result);
  });

  apiRouter.delete(`/articles/:articleId`, (req, res, next) => {
    const {params: {articleId}} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    const result = mainService.deleteArticle(articleId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(result);
  });

  apiRouter.delete(`/articles/:articleId/comments/:commentId`, (req, res, next) => {
    const {params: {articleId, commentId}} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    const result = mainService.deleteComment(articleId, commentId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(result);
  });

  apiRouter.put(`/articles/:articleId`, (req, res, next) => {
    const {params: {articleId}, body} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    if (!Object.keys(body).length) {
      return next(new Error(ARGUMENT_ERROR));
    }

    const result = mainService.editArticle(articleId, body);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(result);
  });

  apiRouter.post(`/articles`, (req, res, next) => {
    const {body} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    const bodyKeys = Object.keys(body);

    if (!hasNeededBodyKeys(bodyKeys) || !Array.isArray(body[Category])) {
      return next(new Error(ARGUMENT_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(mainService.addNewArticle(body));
  });

  apiRouter.post(`/articles/:articleId/comments`, (req, res, next) => {
    const {params: {articleId}, body: {text}} = req;

    logger.debug(`Request on route ${req.originalUrl}`);

    const result = mainService.addNewComment(articleId, text);

    if (!text) {
      return next(new Error(ARGUMENT_ERROR));
    }

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    logger.info(`Status code is 200`);
    return res.status(200).json(result);
  });
};

module.exports = mainApi;
