'use strict';

const express = require(`express`);

const MainService = require(`../data-service/main`);

const mainApi = require(`../api/main`);

const {getLogger} = require(`../lib/logger`);

const {ANSWER_ERROR, ARGUMENT_ERROR, SERVER_SERVICE_ERROR} = require(`../common/consts`);

module.exports = {
  getServerConfig: (dbModels) => {
    const mainService = new MainService(dbModels);

    const logger = getLogger(`server-config`);

    const app = express();

    app.use(express.json());

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

    return {
      app,
      mainService,
    };
  },
};
