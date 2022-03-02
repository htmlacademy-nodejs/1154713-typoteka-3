'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/edit/:id`, (_, res) => res.render(`post/post-edit.pug`));
articlesRouter.get(`/add`, (_, res) => res.render(`post/post.pug`));
articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail.pug`));
articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category.pug`));

module.exports = articlesRouter;
