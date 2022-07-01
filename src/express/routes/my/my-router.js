'use strict';

const {Router} = require(`express`);

const {getUsersRecordData, getUpdatedCommentsData} = require(`../../common/utils`);
const {getAllArticlesMiddleware, getAllCategoriesMiddleware} = require(`../../common/middlewares`);

module.exports = {
  myRouter: (api) => {
    const myRouter = new Router();

    myRouter.get(`/`, getAllArticlesMiddleware(api), (req, res) => {
      const {allArticles: {publicationsData}} = req;
      res.render(`admin/my`, {
        myData: getUsersRecordData(publicationsData),
      });
    });



    /*/ — главная страница;
    /register — регистрация;
    /login — вход;
    /my — мои публикации;
    /my/comments — комментарии к публикациям;
    /articles/category/:id — публикации определённой категории;
    /articles/add — страница создания новой публикации;
    /search — поиск;
    /articles/edit/:id — редактирование публикации;
    /articles/:id — страница публикации;
    /my/categories — категории.*/

    // доработать этот роут ниже



    myRouter.get(`/comments`, getAllArticlesMiddleware(api), (req, res) => {
      const {allArticles: {publicationsData}} = req;
      res.render(`admin/comments`, {
        allPublicationCommentsData: getUpdatedCommentsData(publicationsData),
      });
    });

    myRouter.get(`/categories`, getAllCategoriesMiddleware(api), (req, res) => {
      const {allCategories} = req;
      res.render(`admin/all-categories`, {
        allCategories,
      });
    });

    return myRouter;
  },
};
