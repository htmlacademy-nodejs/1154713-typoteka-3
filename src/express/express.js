'use strict';

const {resolve} = require(`path`);
const express = require(`express`);

const myRoute = require(`./routes/my/myRoute`);
const articlesRoute = require(`./routes/articles/articlesRoute`);
const mainRoute = require(`./routes/main/mainRoute`);

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, resolve(__dirname, `templates`));

app.use(express.static(resolve(__dirname, `public`)));

app.use(`/`, mainRoute);
app.use(`/my`, myRoute);
app.use(`/articles`, articlesRoute);

app.listen(8080, () => console.log(`Front server started`));
