'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);
const {getArticleMiddleware, setNewPostMiddleware} = require(`../../common/middlewares`);

const upload = multer({storage});

module.exports = {
  articlesRouter: (api) => {
    const articlesRouter = new Router();

    articlesRouter.get(`/edit/:id`, getArticleMiddleware(api), (req, res) => {
      const {article} = req;

      res.render(`post/post`, {
        pageTitle: `Редактирование публикации`,
        title: article.title,
        category: article.category,
        announce: article.announce,
        fullText: article.fullText,
      });
    });

    articlesRouter.get(`/add`, (req, res) => {
      const {query: {postData}} = req;

      res.render(`post/post`, {
        ...(postData ? JSON.parse(postData) : {}),
        pageTitle: `Новая публикация`,
      });
    });

    articlesRouter.post(`/add`, upload.single(`upload`), setNewPostMiddleware(api), (_, res) => res.redirect(`/my`));

    articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail`));
    articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category`));

    return articlesRouter;
  },
};
