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
  updatePublicationMiddleware,
} = require(`../../common/middlewares`);
const {getExistThemes, getCardData, getPostCommentErrorQuery} = require(`../../common/utils`);

const upload = multer({storage});



// провер все тесты потом
// hasNeededBodyKeys и проч проверки полей переданных - удалить и заменить на joi
// в комментах выводится кривое время
// как рендерить ошибку валидации см шаблон post-user-2




module.exports = {
  articlesRouter: (api) => {
    const articlesRouter = new Router();



    
    articlesRouter.get(`/edit/:id`, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication}, params: {id}} = req;

      res.render(`post/post`, {
        pageTitle: `Редактирование публикации`,
        title: publication.title,
        announce: publication.announce,
        [`full_text`]: publication.full_text,
        categories: publication.categories,
        isEditPage: true,
        id,
      });
    });

    articlesRouter.post(`/edit/:id`, upload.single(`upload`), updatePublicationMiddleware(api), (req, res) => {

      
      res.send('hyi');

      //res.redirect(`/articles/edit/${req.params.id}`);
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
      const {articleData: {publication, publicationComments, usedCategoriesData}, params: {id}, query: {errorMessage}} = req;

      const validationErrorMessage = errorMessage ? JSON.parse(errorMessage) : ``;

      const pageData = {
        id,
        publicationOwner: publication.publication_owner,
        publicationDate: publication.publication_date,
        title: publication.title,
        categories: usedCategoriesData,
        picture: publication.picture,
        fullText: publication.full_text,
        comments: publicationComments,
        validationErrorMessage,
      };

      res.render(`post/post-detail`, pageData);
    });

    articlesRouter.post(`/:id/comments`, setNewCommentMiddleware(api), (req, res) => {
      const {commentErrorMessage} = req;

      res.redirect(`/articles/${req.params.id}${getPostCommentErrorQuery(commentErrorMessage)}`);
    });






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
