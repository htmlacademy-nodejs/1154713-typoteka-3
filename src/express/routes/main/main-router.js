'use strict';

const {Router} = require(`express`);

const {
  getExistThemes,
  getMostCommentedItems,
  getLastComments,
  getCardData,
  getSearchedData
} = require(`../../common/utils`);

const {NOT_FOUND_FLAG} = require(`../../common/consts`);

module.exports = {
  mainRouter: (api) => {
    const mainRouter = new Router();

    // главная страница
    mainRouter.get(`/`, async (_, res) => {
      const allArticles = await api.getAllArticles();
      const allCategories = await api.getAllCategories();

      res.render(`main/main.pug`, {
        themesData: getExistThemes(allCategories, allArticles),
        mostCommented: getMostCommentedItems(allArticles),
        lastComments: getLastComments(allArticles),
        cardData: getCardData(allArticles),
      });
    });

    // демо страниц авторизации\аутентификации
    mainRouter.get(`/register`, (_, res) => res.render(`auth/sign-up.pug`));
    mainRouter.get(`/login`, (_, res) => res.render(`auth/login.pug`));

    mainRouter.get(`/search`, (req, res) => {
      const {query: {searchData, search}} = req;

      res.render(`search/search.pug`, {
        searchData: getSearchedData(searchData),
        searchValue: search,
      });
    });

    mainRouter.post(`/search`, async (req, res) => {
      const {body: {search}} = req;

      try {
        const result = await api.searchData({search});

        const searchData = encodeURIComponent(JSON.stringify(result));
        res.redirect(`/search?searchData=${searchData}&search=${search}`);
      } catch {
        res.redirect(`/search?searchData=${NOT_FOUND_FLAG}&search=${search}`);
      }
    });

    // демо страниц с ошибками
    mainRouter.get(`/404`, (_, res) => res.render(`errors/404.pug`));
    mainRouter.get(`/500`, (_, res) => res.render(`errors/500.pug`));

    return mainRouter;
  },
};
