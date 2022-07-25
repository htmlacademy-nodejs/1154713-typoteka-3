'use strict';

const {Router} = require(`express`);

const {
  getExistThemes,
  getMostCommentedItems,
  getLastComments,
  getCardData,
  getResultData,
  getPages,
} = require(`../../common/utils`);

const {
  getAllArticlesMiddleware,
  getAllCategoriesMiddleware,
  getSearchDataMiddleware,
  setNewUserMiddleware,
} = require(`../../common/middlewares`);

const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);

const upload = multer({storage});

module.exports = {
  mainRouter: (api) => {
    const mainRouter = new Router();

    // TODO: на гл стр не обрезается длинный title в карточке
    // главная страница
    mainRouter.get(`/`, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), (req, res) => {
      const {
        allArticles: {
          publicationsData,
          lastCommentsData,
          publicationsCount,
          paginationData,
        },
        allCategories,
        query: {
          pageNumber,
        },
      } = req;

      res.render(`main/main`, {
        themesData: getExistThemes(allCategories, publicationsData),
        mostCommented: getMostCommentedItems(publicationsData),
        lastComments: getLastComments(lastCommentsData),
        cardData: getCardData(paginationData),
        pages: getPages(publicationsCount),
        currentPage: pageNumber ?? 1,
      });
    });

    mainRouter.get(`/register`, (_, res) => res.render(`auth/sign-up`, {
      email: ``,
      [`user_name`]: ``,
      [`user_surname`]: ``,
      [`user_password`]: ``,
      [`retry_password`]: ``,
      errorData: undefined,
    }));

    mainRouter.post(`/register`, upload.single(`avatar`), setNewUserMiddleware(api), (req, res) => {
      const {errorData} = req;

      if (errorData) {
        const {body, errorMessages} = JSON.parse(decodeURIComponent(errorData));

        res.render(`auth/sign-up`, {
          ...body,
          errorData: errorMessages,
        });
      } else {
        res.redirect(`/login`);
      }
    });





    mainRouter.get(`/login`, (_, res) => res.render(`auth/login`));


    //mainRouter.post(`/login`, (_, res) => );






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
