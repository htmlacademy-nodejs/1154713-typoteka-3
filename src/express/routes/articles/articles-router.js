'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);
const {
  getArticleMiddleware,
  setNewPostMiddleware,
  getAllArticlesMiddleware,
  getAllCategoriesMiddleware,
  getDataByCategoryMiddleware,
  setNewCommentMiddleware,
  editPublicationMiddleware,
} = require(`../../common/middlewares`);
const {getExistThemes, getCardData} = require(`../../common/utils`);

const upload = multer({storage});




// в комментах выводится кривое время


module.exports = {
  articlesRouter: (api) => {
    const articlesRouter = new Router();

    articlesRouter.get(`/edit/:id`, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication}, params: {id}, query: {errorData}} = req;

      const validationError = errorData ? JSON.parse(errorData) : ``;


      console.log('ошибки редактирования~~~~~~~~~~~', validationError);



      res.render(`post/post`, {
        pageTitle: `Редактирование публикации`,
        title: validationError?.body?.title ?? publication.title,
        announce: validationError?.body?.announce ?? publication.announce,
        [`full_text`]: validationError?.body?.[`full-text`] ?? publication.full_text,
        categories: publication.categories,
        isEditPage: true,
        id,
        validationError: validationError?.errorsMessageData ?? ``,
      });



    });

    articlesRouter.post(`/edit/:id`, upload.single(`upload`), editPublicationMiddleware(api), (req, res) =>
      res.redirect(`/articles/edit/${req.params.id}?errorData=${req.errorData}`));











    
    articlesRouter.get(`/add`, (req, res) => {
      const {query: {errorData}} = req;




      const validationError = errorData ? JSON.parse(errorData) : ``;



      console.log('ошибки добавления~~~~~~~~~~~', validationError);


      res.render(`post/post`, {
        // временно без категории
        pageTitle: `Новая публикация`,
        title: validationError?.body?.title ?? ``,
        announce: validationError?.body?.announce ?? ``,
        [`full_text`]: validationError?.body?.[`full-text`] ?? ``,
        validationError: validationError?.errorsMessageData ?? ``,
      });
    });

    articlesRouter.post(`/add`,
        upload.single(`upload`),
        setNewPostMiddleware(api)
    );



    

    articlesRouter.get(`/:id`, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication, publicationComments, usedCategoriesData}, params: {id}, query: {errorData}} = req;

      const validationError = errorData ? JSON.parse(decodeURIComponent(errorData)) : ``;



      console.log('ошибки комментов~~~~~~~~~~~', validationError);


      const pageData = {
        id,
        publicationOwner: publication.publication_owner,
        publicationDate: publication.publication_date,
        title: publication.title,
        categories: usedCategoriesData,
        picture: publication.picture,
        fullText: publication.full_text,

        // TODO: формат дат в гггг-мм-дд
        comments: publicationComments,
        commentMessage: validationError?.bodyMessage ?? ``,
        errorMessage: validationError?.errorMessage,
      };

      res.render(`post/post-detail`, pageData);
    });

    articlesRouter.post(`/:id/comments`, setNewCommentMiddleware(api), (req, res) =>
      res.redirect(`/articles/${req.params.id}?errorData=${req.errorData}`));






    articlesRouter.get(`/category/:id`, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), getDataByCategoryMiddleware(api), (req, res) => {
      const {allArticles: {publicationsData}, allCategories, selectionByCategory: {categoryName}} = req;

      const filteredCardData = getCardData(publicationsData).reduce((result, data) => {
        const searchedCategory = data.categories.find((item) => item === categoryName);

        if (searchedCategory) {
          result.push(data);
        }

        return result;
      }, []);

      const pageData = {
        categoryName,
        themesData: getExistThemes(allCategories, publicationsData),
        cardData: filteredCardData,
      };

      res.render(`main/articles-by-category`, pageData);
    });

    return articlesRouter;
  },
};
