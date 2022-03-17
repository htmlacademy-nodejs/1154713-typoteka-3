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

const server = async (port) => {
  try {
    const fileData = await readFile(`mock.json`);
    const categoriesData = await getDataFromFile(`./data/categories.txt`);

    const app = express();

    app.listen(port, () => console.log(green(`Service server started`)));

    app.use(express.json());

    postApi(app, new PostService(fileData));
    mainApi(app, new MainService(fileData, categoriesData));

    app.use((_, res) => res.status(ANSWER_ERROR).send(`Not found`));

    app.use((error, _req, res, _next) => {
      switch (error.status) {
        case ANSWER_ERROR:
          return res.status(ANSWER_ERROR).send(`Not found`);

        case ARGUMENT_ERROR:
          return res.status(ARGUMENT_ERROR).send(`Incorrect request argument`);

        default:
          return res.status(SERVER_SERVICE_ERROR).json([]);
      }
    });
  } catch ({message}) {
    console.log(red(`Ошибка ${message}`));
  }
};

module.exports = {
  run: (port = 3000) => server(port),
};
