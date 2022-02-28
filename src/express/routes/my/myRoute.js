'use strict';

const {Router} = require(`express`);

const myRoute = new Router();

myRoute.get(`/comments`, (_, res) => res.render(`admin\\comments.pug`));
myRoute.get(`/`, (_, res) => res.render(`admin\\my.pug`));
myRoute.get(`/categories`, (_, res) => res.render(`admin\\all-categories.pug`));

module.exports = myRoute;
