'use strict';

const {Router} = require(`express`);
const {getLogger} = require(`../lib/logger`);

const {SERVER_SERVICE_ERROR} = require(`../cli/consts`);

const postApi = (app, postService) => {
  const logger = getLogger(`post`);

  const postRouter = new Router();
  app.use(`/post`, postRouter);

  postRouter.get(`/`, (req, res, next) => {
    logger.debug(`Request on route ${req.originalUrl}`);

    try {
      logger.info(`Status code is 200`);
      res.status(200).json(postService.getAll());
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  });
};

module.exports = postApi;
