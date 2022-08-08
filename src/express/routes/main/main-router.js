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
  checkAuthentificationData,
  checkCookiesData,
} = require(`../../common/middlewares`);

const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);

const upload = multer({storage});

module.exports = {
  mainRouter: (api) => {
    const mainRouter = new Router();



    // проверить тесты
    // тесты для методов рефрештокена ?
    // пройтись по всем роутам поправить отобр фио, когда не авторизован + сделать редирект с закрытых роутов на логин
    

    // TODO: на гл стр не обрезается длинный title в карточке

    mainRouter.get(`/register`, (req, res) => {
      if (req.cookies.auth) {
        res.redirect(`/`);
      } else {
        res.render(`auth/sign-up`, {
          email: ``,
          [`user_name`]: ``,
          [`user_surname`]: ``,
          [`user_password`]: ``,
          [`retry_password`]: ``,
          errorData: undefined,
        });
      }
    });

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

    mainRouter.get(`/login`, (req, res) => {
      if (req.cookies.auth) {
        res.redirect(`/`);
      } else {
        res.render(`auth/login`, {
          email: ``,
          [`user_password`]: ``,
          errorMessage: ``,
        });
      }
    });

    mainRouter.post(`/login`, checkAuthentificationData(api), (req, res) => {
      const {authData, body} = req;

      if (authData.errorMessage) {
        res.render(`auth/login`, {
          email: body.email,
          [`user_password`]: body[`user_password`],
          errorMessage: authData.errorMessage,
        });
      } else {
        res.cookie(`auth`, authData.jwt, {httpOnly: true, sameSite: true});
        res.redirect(`/`);
      }
    });

    mainRouter.get(`/`, checkCookiesData, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), async (req, res) => {
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
        authorizedData,
      } = req;

      res.render(`main/main`, {
        themesData: getExistThemes(allCategories, publicationsData),
        mostCommented: getMostCommentedItems(publicationsData),
        lastComments: getLastComments(lastCommentsData),
        cardData: getCardData(paginationData),
        pages: getPages(publicationsCount),
        currentPage: pageNumber ?? 1,

        isAuthorized: !!Object.keys(authorizedData).length,
        authorizedData,
      });
    });

    mainRouter.get(`/search`, checkCookiesData, getSearchDataMiddleware(api), (req, res) => {
      const {query: {search}, result, authorizedData} = req;

      res.render(`search/search`, {
        searchData: getResultData(search, result),
        searchValue: search,


        isAuthorized: !!Object.keys(authorizedData).length,
        authorizedData,
      });
    });

    mainRouter.get(`/404`, (_, res) => res.render(`errors/404`));
    mainRouter.get(`/500`, (_, res) => res.render(`errors/500`));

    return mainRouter;
  },
};
