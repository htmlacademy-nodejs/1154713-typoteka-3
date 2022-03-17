'use strict';

const {Router} = require(`express`);

const {SERVER_SERVICE_ERROR} = require(`../cli/consts`);

const postRouter = new Router();

const postApi = (app, postService) => {
  app.use(`/post`, postRouter);

  postRouter.get(`/`, (_, res, next) => {
    try {
      res.json(postService.getAll());
    } catch {
      next({status: SERVER_SERVICE_ERROR});
    }
  });
};

module.exports = postApi;
