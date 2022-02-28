'use strict';

const {Router} = require(`express`);

const articlesRoute = new Router();

articlesRoute.get(`/edit/:id`, (_, res) => res.render(`post\\post-edit.pug`));
articlesRoute.get(`/add`, (_, res) => res.render(`post\\post.pug`));
articlesRoute.get(`/:id`, (_, res) => res.render(`post\\post-detail.pug`));
articlesRoute.get(`/category/:id`, (_, res) => res.render(`main\\articles-by-category.pug`));

module.exports = articlesRoute;
