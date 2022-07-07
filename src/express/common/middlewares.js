'use strict';

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
    const {body, file} = req;

    const offerData = {
      // пока хардкод user
      [`user_id`]: 1,
      title: body.title,
      picture: file ? file.filename : null,
      // пока хардкод категорий
      categories: [`IT`, `Без рамки`],
      announce: body.announce,
      [`full_text`]: body[`full-text`],
      [`publication_date`]: body.date,
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
      req.errorData = errorMessage;
    }

    next();
  },
  updatePublicationMiddleware: (api) => async (req, res, next) => {
    const {params: {id}, body, file} = req;




    const offerData = {
      // пока хардкод user
      [`user_id`]: 1,
      title: body.title,
      picture: file ? file.filename : null,
      // пока хардкод категорий
      categories: [`IT`, `Без рамки`],
      announce: body.announce,
      [`full_text`]: body[`full-text`],
      [`publication_date`]: body.date,
    };



    /*const offerData = {
      // пока хардкод user
      [`user_id`]: 1,
      title: '',
      picture: 'sss.ff',
      // пока хардкод категорий
      categories: [],
      announce: '',
      [`full_text`]: '',
      [`publication_date`]: '',
    };*/



    console.log('FFFF~~~~~~~~~~~~', file);
    console.log('BBBBB~~~~~~~~~~~~~~', body);
    console.log('IDIDIDI~~~~~~~~~~~~~~', id);


    try {
      await api.updatePublication(id, offerData);
      req.errorData = ``;
    } catch ({response: {data}}) {

      const errorsMessageData = data.map(({message, context: {key}}) => ({
        key,
        message,
      }));

      const errorData = encodeURIComponent(JSON.stringify(errorsMessageData));

      req.errorData = errorData;
    }

    next();
  },
};
