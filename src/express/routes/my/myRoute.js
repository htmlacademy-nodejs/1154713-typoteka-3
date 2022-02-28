'use strict';

const {Router} = require(`express`);
const {MY} = require(`../../consts`);

const myRoute = new Router();

myRoute.get(`/`, (_, res) => res.send(MY));
myRoute.get(`/comments`, (_, res) => res.send(`${MY}/comments`));
myRoute.get(`/categories`, (_, res) => res.send(`${MY}/categories`));

module.exports = myRoute;
