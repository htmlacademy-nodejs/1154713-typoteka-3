'use strict';

const {promises: {readFile}} = require(`fs`);

const express = require(`express`);

const {red, green} = require(`chalk`);

const PostService = require(`../data-service/post`);
const MainService = require(`../data-service/main`);

const postApi = require(`../api/post`);
const mainApi = require(`../api/main`);

const {ANSWER_ERROR, SERVER_SERVICE_ERROR, ARGUMENT_ERROR} = require(`./consts`);
const {getDataFromFile} = require(`./utils`);

const app = express();

const createServer = async (port) => {
  try {
    const fileData = await readFile(`mock.json`);
    const categoriesData = await getDataFromFile(`./data/categories.txt`);

    app.use(express.json());

    postApi(app, new PostService(JSON.parse(fileData)));
    mainApi(app, new MainService(JSON.parse(fileData), categoriesData));

    app.use((_, res) => res.status(ANSWER_ERROR).send(`Not found`));

    app.use((error, _req, res, _next) => {
      switch (error.message) {
        case ANSWER_ERROR:
          return res.status(ANSWER_ERROR).send(`Not found`);

        case ARGUMENT_ERROR:
          return res.status(ARGUMENT_ERROR).send(`Incorrect request argument`);

        default:
          return res.status(SERVER_SERVICE_ERROR).json([]);
      }
    });

    app.listen(port, () => console.log(green(`Service server started`)));
  } catch ({message}) {
    console.log(red(`Ошибка ${message}`));
  }
};

module.exports = {
  run: (port = 3000) => createServer(port),
  server: app,
};
