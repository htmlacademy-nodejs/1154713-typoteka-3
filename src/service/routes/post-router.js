'use strict';

const {Router} = require(`express`);

const {SERVER_SERVICE_ERROR} = require(`../cli/consts`);

const postRouter = new Router();

postRouter.get(`/`, (req, res, next) => {
  try {
    res.json(JSON.parse(req.mockData));
  } catch {
    next({status: SERVER_SERVICE_ERROR});
  }
});

module.exports = postRouter;
