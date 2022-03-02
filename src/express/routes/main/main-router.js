'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

// демо главных страниц
mainRouter.get(`/`, (_, res) => res.render(`main/main.pug`));

// демо страниц авторизации\аутентификации
mainRouter.get(`/register`, (_, res) => res.render(`auth/sign-up.pug`));
mainRouter.get(`/login`, (_, res) => res.render(`auth/login.pug`));

// демо вариантов страниц поиска
mainRouter.get(`/search-1`, (_, res) => res.render(`search/search-1.pug`));
mainRouter.get(`/search-2`, (_, res) => res.render(`search/search-2.pug`));
mainRouter.get(`/search-3`, (_, res) => res.render(`search/search-3.pug`));

// демо страниц с ошибками
mainRouter.get(`/404`, (_, res) => res.render(`errors/404.pug`));
mainRouter.get(`/500`, (_, res) => res.render(`errors/500.pug`));

module.exports = mainRouter;
