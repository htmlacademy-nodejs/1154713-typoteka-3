'use strict';

const express = require(`express`);

const PostService = require(`../data-service/post`);
const MainService = require(`../data-service/main`);

const postApi = require(`../api/post`);
const mainApi = require(`../api/main`);

const {ANSWER_ERROR, ARGUMENT_ERROR, SERVER_SERVICE_ERROR} = require(`./consts`);

module.exports = {
  getServerConfig: (mockData, categoriesData) => {
    const postService = new PostService(mockData);
    const mainService = new MainService(mockData, categoriesData);
    
    const app = express();

    app.use(express.json());

    postApi(app, postService);
    mainApi(app, mainService);

    app.use((_, res) => res.status(ANSWER_ERROR).send(`Not found`));

    app.use((error, _req, res, _next) => {
      switch (Number(error.message)) {
        case ANSWER_ERROR:
          return res.status(ANSWER_ERROR).send(`Not found`);

        case ARGUMENT_ERROR:
          return res.status(ARGUMENT_ERROR).send(`Incorrect request argument`);

        default:
          return res.status(SERVER_SERVICE_ERROR).json([]);
      }
    });

    return app;
  },
};
