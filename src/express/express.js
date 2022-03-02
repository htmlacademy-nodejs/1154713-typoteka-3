'use strict';

const {resolve} = require(`path`);
const express = require(`express`);

const myRouter = require(`./routes/my/my-router`);
const articlesRouter = require(`./routes/articles/articles-router`);
const mainRouter = require(`./routes/main/main-router`);

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, resolve(__dirname, `templates`));

app.use(express.static(resolve(__dirname, `public`)));

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(8080, () => console.log(`Front server started`));
