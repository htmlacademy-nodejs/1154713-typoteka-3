'use strict';

module.exports = {
  getAllArticlesMiddleware: (api) => async (req, res, next) => {
    req.allArticles = await api.getAllArticles();
    next();
  },
  getAllCategoriesMiddleware: (api) => async (req, res, next) => {
    req.allCategories = await api.getAllCategories();
    next();
  },
  getArticleMiddleware: (api) => async (req, res, next) => {
    const {params: {id}} = req;

    req.article = await api.getArticle(id);
    next();
  },
  setNewPostMiddleware: (api) => async (req, res, next) => {
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
      next();
    } catch {
      const postData = encodeURIComponent(JSON.stringify(offerData));
      res.redirect(`/articles/add?postData=${postData}`);
    }
  },
  getSearchDataMiddleware: (api) => async (req, res, next) => {
    const {query: {search}} = req;
    try {
      const result = await api.searchData({search});
      req.result = result;
      next();
    } catch {
      next();
    }
  },
};
