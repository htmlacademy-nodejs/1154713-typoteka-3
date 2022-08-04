'use strict';

const {resolve} = require(`path`);
const express = require(`express`);
const cookies = require(`cookie-parser`);
const helmet = require(`helmet`);

const {myRouter} = require(`./routes/my/my-router`);
const {articlesRouter} = require(`./routes/articles/articles-router`);
const {mainRouter} = require(`./routes/main/main-router`);

const AxiosApi = require(`./api/axios-api`);

const axiosApi = new AxiosApi(`http://localhost:3000`, 1000);
const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, resolve(__dirname, `templates`));

app.use(cookies());
app.use(express.urlencoded({extended: false}));
app.use(express.static(resolve(__dirname, `public`)));
app.use(express.static(resolve(__dirname, `upload`)));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: [`'self'`, `'unsafe-eval'`],
    }
  },
  xssFilter: true,
}));

app.use(`/`, mainRouter(axiosApi));
app.use(`/my`, myRouter(axiosApi));
app.use(`/articles`, articlesRouter(axiosApi));

app.listen(8080, () => console.log(`Front server started`));
