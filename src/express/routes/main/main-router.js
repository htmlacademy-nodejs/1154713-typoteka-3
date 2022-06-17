'use strict';

const {Router} = require(`express`);

const {
  getExistThemes,
  getMostCommentedItems,
  getLastComments,
  getCardData,
  getResultData,
} = require(`../../common/utils`);

const {getAllArticlesMiddleware, getAllCategoriesMiddleware, getSearchDataMiddleware, setPageData} = require(`../../common/middlewares`);

module.exports = {
  mainRouter: (api) => {
    const mainRouter = new Router();

    // главная страница
    mainRouter.get(`/`, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), (req, res) => {
      const {allArticles: {publicationsData, lastCommentsData}, allCategories} = req;

      res.render(`main/main`, {
        themesData: getExistThemes(allCategories, publicationsData),
        mostCommented: getMostCommentedItems(publicationsData),
        lastComments: getLastComments(lastCommentsData),
        cardData: getCardData(publicationsData),
      });
    });


    // в шаблоне будет массив кнопок, каждая - будет submit, этот submit обраб в post
    //articlesRouter.post(`/add`, upload.single(`upload`), setNewPostMiddleware(api), (_, res) => res.redirect(`/my`));
    
    mainRouter.post(`/`, setPageData(api), (_, res) => res.redirect(`/`));




    // демо страниц авторизации\аутентификации
    mainRouter.get(`/register`, (_, res) => res.render(`auth/sign-up`));
    mainRouter.get(`/login`, (_, res) => res.render(`auth/login`));

    mainRouter.get(`/search`, getSearchDataMiddleware(api), (req, res) => {
      const {query: {search}, result} = req;

      res.render(`search/search`, {
        searchData: getResultData(search, result),
        searchValue: search,
      });
    });

    // демо страниц с ошибками
    mainRouter.get(`/404`, (_, res) => res.render(`errors/404`));
    mainRouter.get(`/500`, (_, res) => res.render(`errors/500`));

    return mainRouter;
  },
};
