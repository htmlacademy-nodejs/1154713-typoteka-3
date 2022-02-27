'use strict';

const {Router} = require(`express`);
const {ARTICLES} = require(`../../consts`);

const articlesRoutes = new Router();

articlesRoutes.get(`/add`, (_, res) => res.send(`${ARTICLES}/add`));
articlesRoutes.get(`/:id`, (req, res) => res.send(`${ARTICLES}/:id ${req.params.id}`));
articlesRoutes.get(`/edit/:id`, (req, res) => res.send(`${ARTICLES}/edit/:id ${req.params.id}`));
articlesRoutes.get(`/category/:id`, (req, res) => res.send(`${ARTICLES}/category/:id ${req.params.id}`));

module.exports = articlesRoutes;
