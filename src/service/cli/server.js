'use strict';

const express = require(`express`);
const {ANSWER_ERROR} = require(`./consts`);
const postRouter = require(`../routes/post-router`);

const server = (port) => {
  const app = express();

  app.listen(port, () => console.log(`Service server started`));
  app.on(`error`, ({message}) => console.log(`Ошибка ${message}`));

  app.use(express.json());

  app.use(`/post`, postRouter);

  app.use((_, res) => res.status(ANSWER_ERROR).send(`Not found`));
};

module.exports = {
  run: (port = 3000) => server(port),
};
