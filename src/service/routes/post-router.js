'use strict';

const {Router} = require(`express`);
const {promises: {readFile}} = require(`fs`);

const postRouter = new Router();

postRouter.get(`/`, async (_, res) => {
  try {
    const fileData = await readFile(`mock.json`);
    res.json(JSON.parse(fileData));
  } catch {
    res.send([]);
  }
});

module.exports = postRouter;
