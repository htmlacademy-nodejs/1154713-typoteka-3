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



// провер все тесты потом
// самодел проверки полей переданных удалить и заменить на joi
// в комментах выводится кривое время
// как рендерить ошибку валидации см шаблон post-user-2

// если есть ошибка то после не должен редиректить никуда, а должен ост введенные новые данные и показ ошибку под ними


module.exports = {
  articlesRouter: (api) => {
    const articlesRouter = new Router();

    articlesRouter.get(`/edit/:id`, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication}, params: {id}, query: {errorData}} = req;

      const validationError = errorData ? JSON.parse(errorData) : ``;


      console.log('ошибки редактирования~~~~~~~~~~~', validationError);


      res.render(`post/post`, {
        pageTitle: `Редактирование публикации`,
        title: publication.title,
        announce: publication.announce,
        [`full_text`]: publication.full_text,
        categories: publication.categories,
        isEditPage: true,
        id,
        validationError,
      });
    });

    articlesRouter.post(`/edit/:id`, upload.single(`upload`), editPublicationMiddleware(api), (req, res) =>
      res.redirect(`/articles/edit/${req.params.id}?errorData=${req.errorData}`));











    
    articlesRouter.get(`/add`, (req, res) => {
      const {query: {postData, errorData}} = req;

      const validationError = errorData ? JSON.parse(errorData) : ``;



      console.log('ошибки добавления~~~~~~~~~~~', validationError);



      res.render(`post/post`, {
        ...(postData ? JSON.parse(postData) : {}),
        pageTitle: `Новая публикация`,
        validationError,
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
        comments: publicationComments,
        validationError,
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
