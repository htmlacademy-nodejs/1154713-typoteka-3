'use strict';

const {Router} = require(`express`);

const {SERVER_SERVICE_ERROR} = require(`../cli/consts`);

const postApi =  (app, postService) => {
  const postRouter = new Router();
  
  app.use(`/post`, postRouter);

  postRouter.get(`/`, (_, res, next) => {
    try {
      res.json(postService.getAll());
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  });
};

module.exports = postApi;
