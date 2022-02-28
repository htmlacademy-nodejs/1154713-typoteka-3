'use strict';

const {Router} = require(`express`);
const {ARTICLES} = require(`../../consts`);

const articlesRoute = new Router();

articlesRoute.get(`/add`, (_, res) => res.send(`${ARTICLES}/add`));
articlesRoute.get(`/:id`, (req, res) => res.send(`${ARTICLES}/:id ${req.params.id}`));
articlesRoute.get(`/edit/:id`, (req, res) => res.send(`${ARTICLES}/edit/:id ${req.params.id}`));
articlesRoute.get(`/category/:id`, (req, res) => res.send(`${ARTICLES}/category/:id ${req.params.id}`));

module.exports = articlesRoute;
