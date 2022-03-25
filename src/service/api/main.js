'use strict';

const {Router} = require(`express`);

const {SERVER_SERVICE_ERROR, ANSWER_ERROR, ARGUMENT_ERROR, BodyArguments: {Category}} = require(`../cli/consts`);
const {hasNeededBodyKeys} = require(`../cli/utils`);

const mainApi = (app, mainService) => {
  const apiRouter = new Router();

  app.use(`/api`, apiRouter);

  apiRouter.get(`/articles`, (_, res, next) => {
    try {
      res.json(mainService.getAll());
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  });

  apiRouter.get(`/articles/:articleId`, (req, res, next) => {
    const {params: {articleId}} = req;
    const result = mainService.find(articleId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    return res.json(result);
  });

  apiRouter.get(`/categories`, (_, res) => res.send(mainService.getCategories()));

  apiRouter.get(`/articles/:articleId/comments`, (req, res, next) => {
    const {params: {articleId}} = req;
    const result = mainService.find(articleId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    return res.json(result.comments);
  });

  apiRouter.get(`/search`, (req, res, next) => {
    const {query} = req;
    const result = mainService.getSearchedData(query.title);

    if (!result.length) {
      return next(new Error(ANSWER_ERROR));
    }

    return res.json(result);
  });

  apiRouter.delete(`/articles/:articleId`, (req, res, next) => {
    const {params: {articleId}} = req;
    const result = mainService.deleteArticle(articleId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    return res.json(result);
  });

  apiRouter.delete(`/articles/:articleId/comments/:commentId`, (req, res, next) => {
    const {params: {articleId, commentId}} = req;
    const result = mainService.deleteComment(articleId, commentId);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    return res.json(result);
  });

  apiRouter.put(`/articles/:articleId`, (req, res, next) => {
    const {params: {articleId}, body} = req;

    if (!Object.keys(body).length) {
      return next(new Error(ARGUMENT_ERROR));
    }

    const result = mainService.editArticle(articleId, body);

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    return res.json(result);
  });

  apiRouter.post(`/articles`, (req, res, next) => {
    const {body} = req;
    const bodyKeys = Object.keys(body);

    if (!hasNeededBodyKeys(bodyKeys) || !Array.isArray(body[Category])) {
      return next(new Error(ARGUMENT_ERROR));
    }

    return res.json(mainService.addNewArticle(body));
  });

  apiRouter.post(`/articles/:articleId/comments`, (req, res, next) => {
    const {params: {articleId}, body: {text}} = req;
    const result = mainService.addNewComment(articleId, text);

    if (!text) {
      return next(new Error(ARGUMENT_ERROR));
    }

    if (!result) {
      return next(new Error(ANSWER_ERROR));
    }

    return res.json(result);
  });
};

module.exports = mainApi;
