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
      const {articleData: {publication}} = req;

      res.render(`post/post`, {
        pageTitle: `Редактирование публикации`,
        title: publication.title,
        announce: publication.announce,
        [`full_text`]: publication.full_text,
        categories: publication.categories,
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





    


    articlesRouter.get(`/:id`, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication, publicationComments, usedCategoriesData}} = req;

      const pageData = {
        publicationOwner: publication.publication_owner,
        publicationDate: publication.publication_date,
        title: publication.title,
        categories: usedCategoriesData,
        picture: publication.picture,
        fullText: publication.full_text,
        comments: publicationComments,
      };

      res.render(`post/post-detail`, pageData);
    });



    // хардкод
    articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category`));





    return articlesRouter;
  },
};
