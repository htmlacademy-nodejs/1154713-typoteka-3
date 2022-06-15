'use strict';

const {resolve} = require(`path`);
const express = require(`express`);

const {myRouter} = require(`./routes/my/my-router`);
const {articlesRouter} = require(`./routes/articles/articles-router`);
const {mainRouter} = require(`./routes/main/main-router`);

const AxiosApi = require(`./api/axios-api`);

const axiosApi = new AxiosApi(`http://localhost:3000`, 1000);
const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, resolve(__dirname, `templates`));

app.use(express.urlencoded({extended: false}));
app.use(express.static(resolve(__dirname, `public`)));
app.use(express.static(resolve(__dirname, `upload`)));




// пейджер
// на главной
// посты по категориям


// 5 ссылок (-1 для текущей) в пейджинге
// на кажд 8 эл-ов, или остаток


// отдельн мидла для пейджинговых данных (все публикации метод нужно ост)

// нужны ли utils



app.use(`/`, mainRouter(axiosApi));
app.use(`/my`, myRouter(axiosApi));
app.use(`/articles`, articlesRouter(axiosApi));

app.listen(8080, () => console.log(`Front server started`));
