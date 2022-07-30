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
const {renderPostDetailPage, renderPostEditPage, renderAddPostPage} = require(`./utils`);

const upload = multer({storage});

module.exports = {
  articlesRouter: (api) => {
    const articlesRouter = new Router();




    // только автору блога
    // в шапке отображается кнопка новая публикация аватар пользователя, имя, фамилия и ссылка «Выход»;
    articlesRouter.get(`/edit/:id`, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication}, params: {id}, errorData} = req;

      renderPostEditPage({
        errorData,
        publication,
        id,
        res,
      });
    });

    articlesRouter.post(`/edit/:id`, upload.single(`upload`), editPublicationMiddleware(api), getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication}, params: {id}, errorData} = req;

      renderPostEditPage({
        errorData,
        publication,
        id,
        res,
      });
    });




    // только автору блога
    // в шапке отображается кнопка новая публикация аватар пользователя, имя, фамилия и ссылка «Выход»;
    articlesRouter.get(`/add`, (req, res) => {
      const {errorData} = req;

      renderAddPostPage({
        errorData,
        res,
      });
    });

    articlesRouter.post(`/add`,
        upload.single(`upload`),
        setNewPostMiddleware(api),
        (req, res) => {
          const {errorData} = req;

          if (errorData) {
            renderAddPostPage({
              errorData,
              res,
            });
          }
        }
    );



    // доступна всем
    // Для гостей в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // комменты могут добавлять только авторизов пользаки
    // Для читателей в шапке отображается кнопка новая публикация, аватар пользователя, имя, фамилия и ссылка «Выход»;
    articlesRouter.get(`/:id`, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication, publicationComments, usedCategoriesData}, params: {id}, errorData} = req;

      renderPostDetailPage({
        id,
        errorData,
        publication,
        usedCategoriesData,
        publicationComments,
        res,




      });
    });

    articlesRouter.post(`/:id/comments`, getArticleMiddleware(api), setNewCommentMiddleware(api), (req, res) => {
      const {articleData: {publication, publicationComments, usedCategoriesData}, params: {id}, errorData} = req;

      if (errorData) {
        renderPostDetailPage({
          id,
          errorData,
          publication,
          usedCategoriesData,
          publicationComments,
          res,
        });
      } else {
        res.redirect(`/articles/${req.params.id}`);
      }
    });




    // Для гостей в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // Для читателей в шапке отображается кнопка новая публикация аватар пользователя, имя, фамилия и ссылка «Выход»;
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


        isAuthorized: true,
      };

      res.render(`main/articles-by-category`, pageData);
    });

    return articlesRouter;
  },
};
