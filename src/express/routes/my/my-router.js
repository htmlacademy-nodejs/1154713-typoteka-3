'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/comments`, (_, res) => res.render(`admin/comments.pug`));
myRouter.get(`/`, (_, res) => res.render(`admin/my.pug`));
myRouter.get(`/categories`, (_, res) => res.render(`admin/all-categories.pug`));

module.exports = myRouter;
