'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);

const articlesRouter = new Router();

const upload = multer({storage});

module.exports = {
  articlesRouter: (api) => {
    articlesRouter.get(`/edit/:id`, async (req, res) => {
      const {params: {id}} = req;
      const article = await api.getArticle(id);

      res.render(`post/post.pug`, {
        pageTitle: `Редактирование публикации`,
        title: article.title,
        category: article.category,
        announce: article.announce,
        fullText: article.fullText,
      });
    });

    articlesRouter.get(`/add`, (req, res) => {
      const {query: {postData}} = req;

      res.render(`post/post.pug`, {
        ...(postData ? JSON.parse(postData) : {}),
        pageTitle: `Новая публикация`,
      });
    });

    articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
      const {body, file} = req;

      const offerData = {
        title: body.title,
        photo: file ? file.filename : ``,
        category: [],
        announce: body.announce,
        fullText: body[`full-text`],
        createdDate: body.date,
      };

      try {
        await api.setNewPost(offerData);
        res.redirect(`/my`);
      } catch {
        const postData = encodeURIComponent(JSON.stringify(offerData));
        res.redirect(`/articles/add?postData=${postData}`);
      }
    });

    articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail.pug`));
    articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category.pug`));

    return articlesRouter;
  },
};
