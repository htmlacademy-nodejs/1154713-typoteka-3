'use strict';

const express = require(`express`);
const {MY, ARTICLES} = require(`./consts`);

const myRoutes = require(`./routes/my/myRoutes`);
const articlesRoutes = require(`./routes/articles/articlesRoutes`);

const app = express();

app.use(MY, myRoutes);
app.use(ARTICLES, articlesRoutes);

app.get(`/`, (_, res) => res.send(`/`));
app.get(`/register`, (_, res) => res.send(`/register`));
app.get(`/login`, (_, res) => res.send(`/login`));
app.get(`/search`, (_, res) => res.send(`/search`));

app.listen(8080, () => console.log(`Front server started`));
