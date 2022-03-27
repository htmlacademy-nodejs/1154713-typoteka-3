'use strict';

const express = require(`express`);

const PostService = require(`../data-service/post`);
const MainService = require(`../data-service/main`);

const postApi = require(`../api/post`);
const mainApi = require(`../api/main`);

const {getLogger} = require(`../lib/logger`);

const {ANSWER_ERROR, ARGUMENT_ERROR, SERVER_SERVICE_ERROR} = require(`./consts`);

module.exports = {
  getServerConfig: (mockData, categoriesData) => {
    const postService = new PostService(mockData);
    const mainService = new MainService(mockData, categoriesData);

    const logger = getLogger(`server-config`);

    const app = express();

    app.use(express.json());

    postApi(app, postService);
    mainApi(app, mainService);

    app.use((_, res) => {
      logger.error(`Error: ${ANSWER_ERROR}`);
      return res.status(ANSWER_ERROR).send(`Route not found`);
    });

    app.use((error, _req, res, _next) => {
      switch (Number(error.message)) {
        case ANSWER_ERROR:
          logger.error(`Error: ${error.message}`);
          return res.status(ANSWER_ERROR).send(`Not found`);

        case ARGUMENT_ERROR:
          logger.error(`Error: ${error.message}`);
          return res.status(ARGUMENT_ERROR).send(`Incorrect request argument`);

        default:
          logger.error(`Error: ${error.message}`);
          return res.status(SERVER_SERVICE_ERROR).json([]);
      }
    });

    return app;
  },
};
