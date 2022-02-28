'use strict';

const {resolve} = require(`path`);
const express = require(`express`);
const {MY, ARTICLES} = require(`./consts`);

const myRoute = require(`./routes/my/myRoute`);
const articlesRoute = require(`./routes/articles/articlesRoute`);

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, resolve(__dirname, `templates`));

app.use(express.static(resolve(__dirname, `public`)));

app.use(MY, myRoute);
app.use(ARTICLES, articlesRoute);

app.get(`/`, (_, res) => res.send(`/`));
app.get(`/register`, (_, res) => res.send(`/register`));
app.get(`/login`, (_, res) => res.send(`/login`));
app.get(`/search`, (_, res) => res.send(`/search`));

app.get(`/404`, (_, res) => res.render(`errors\\404.pug`));

app.listen(8080, () => console.log(`Front server started`));
