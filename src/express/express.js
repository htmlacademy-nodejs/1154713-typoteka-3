'use strict';

const express = require(`express`);
const {MY, ARTICLES} = require(`./consts`);

const myRoute = require(`./routes/my/myRoute`);
const articlesRoute = require(`./routes/articles/articlesRoute`);

const app = express();

app.use(MY, myRoute);
app.use(ARTICLES, articlesRoute);

app.get(`/`, (_, res) => res.send(`/`));
app.get(`/register`, (_, res) => res.send(`/register`));
app.get(`/login`, (_, res) => res.send(`/login`));
app.get(`/search`, (_, res) => res.send(`/search`));

app.listen(8080, () => console.log(`Front server started`));
