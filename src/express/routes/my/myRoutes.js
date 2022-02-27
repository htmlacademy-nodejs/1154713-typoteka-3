'use strict';

const {Router} = require(`express`);
const {MY} = require(`../../consts`);

const myRoutes = new Router();

myRoutes.get(`/`, (_, res) => res.send(MY));
myRoutes.get(`/comments`, (_, res) => res.send(`${MY}/comments`));
myRoutes.get(`/categories`, (_, res) => res.send(`${MY}/categories`));

module.exports = myRoutes;
