'use strict';

const {Router} = require(`express`);

const mainRoute = new Router();

// демо главных страниц
mainRoute.get(`/`, (_, res) => res.render(`main\\main.pug`));

// демо страниц авторизации\аутентификации
mainRoute.get(`/register`, (_, res) => res.render(`auth\\sign-up.pug`));
mainRoute.get(`/login`, (_, res) => res.render(`auth\\login.pug`));

// демо вариантов страниц поиска
mainRoute.get(`/search-1`, (_, res) => res.render(`search\\search-1.pug`));
mainRoute.get(`/search-2`, (_, res) => res.render(`search\\search-2.pug`));
mainRoute.get(`/search-3`, (_, res) => res.render(`search\\search-3.pug`));

// демо страниц с ошибками
mainRoute.get(`/404`, (_, res) => res.render(`errors\\404.pug`));
mainRoute.get(`/500`, (_, res) => res.render(`errors\\500.pug`));

module.exports = mainRoute;
