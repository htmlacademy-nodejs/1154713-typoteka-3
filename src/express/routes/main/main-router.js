'use strict';

const {Router} = require(`express`);

const {
  getExistThemes,
  getMostCommentedItems,
  getLastComments,
  getCardData,
  getResultData,
} = require(`../../common/utils`);

const {getAllArticlesMiddleware, getAllCategoriesMiddleware, getSearchDataMiddleware} = require(`../../common/middlewares`);

module.exports = {
  mainRouter: (api) => {
    const mainRouter = new Router();




    
    // главная страница
    mainRouter.get(`/`, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), (req, res) => {
      const {allArticles, allCategories} = req;


      console.log('getExistThemes', getExistThemes(allCategories, allArticles));
      console.log('getMostCommentedItems', getMostCommentedItems(allArticles));
      console.log('getLastComments', getLastComments(allArticles));



      res.render(`main/main`, {
        themesData: getExistThemes(allCategories, allArticles),
        mostCommented: getMostCommentedItems(allArticles),




        lastComments: getLastComments(allArticles),



        cardData: getCardData(allArticles),
      });
    });





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
