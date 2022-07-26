'use strict';

const {getPostMiddlewareAction} = require(`./utils`);

module.exports = {
  getAllArticlesMiddleware: (api) => async (req, res, next) => {
    const {query: {pageNumber}} = req;
    req.allArticles = await api.getAllArticles({
      pageNumber: pageNumber ?? 1,
    });
    next();
  },
  getAllCategoriesMiddleware: (api) => async (req, res, next) => {
    req.allCategories = await api.getAllCategories();
    next();
  },
  getArticleMiddleware: (api) => async (req, res, next) => {
    const {params: {id}} = req;

    req.articleData = await api.getArticle(id);
    next();
  },
  setNewPostMiddleware: (api) => async (req, res, next) => {
    await getPostMiddlewareAction(req, res, api, true);
    next();
  },
  getSearchDataMiddleware: (api) => async (req, res, next) => {
    const {query: {search}} = req;
    try {
      const result = await api.getSearchData({search});
      req.result = result;
      next();
    } catch {
      next();
    }
  },
  getDataByCategoryMiddleware: (api) => async (req, res, next) => {
    const {params: {id}} = req;

    req.selectionByCategory = await api.getCategoryDataById(id);
    next();
  },
  setNewCommentMiddleware: (api) => async (req, res, next) => {
    const {params: {id}, body} = req;

    try {
      await api.setNewComment(id, body);
      req.errorData = ``;
    } catch ({response: {data: errorMessage}}) {

      const errorData = {
        bodyMessage: body.message,
        errorMessage,
      };

      req.errorData = encodeURIComponent(JSON.stringify(errorData));
    }

    next();
  },

  editPublicationMiddleware: (api) => async (req, res, next) => {
    await getPostMiddlewareAction(req, res, api, false, true);
    next();
  },

  setNewUserMiddleware: (api) => async (req, res, next) => {
    const {body, file} = req;

    const updatedBody = {
      ...body,
      avatar: file ? file.filename : null,
    };

    try {
      await api.setNewUser(updatedBody);
      req.errorData = ``;
    } catch ({response: {data: errorMessages}}) {
      const preparedErrorData = {
        body,
        errorMessages: errorMessages.map(({message}) => message),
      };

      req.errorData = encodeURIComponent(JSON.stringify(preparedErrorData));
    }

    next();
  },

  checkAuthentificationData: (api) => async (req, res, next) => {
    const {body} = req;

    req.errorMessage = await api.checkAuthentification(body);
    next();
  },
};
