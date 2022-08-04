'use strict';

const {Router} = require(`express`);

const jwt = require(`jsonwebtoken`);

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
} = require(`../../common/middlewares`);

const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);

const upload = multer({storage});

module.exports = {
  mainRouter: (api) => {
    const mainRouter = new Router();



    // обернуть закрытые роуты в мидл и проверять есть ли jwt и нужно ли обновлять ?
    // isAuthorized flag в шаблоне кнопок хедера
    // fix tests with jwt logic ?


    // проверить тесты
    // тесты для методов рефрештокена ?

    // пройтись по всем роутам - проверить на юзера
    

    // TODO: на гл стр не обрезается длинный title в карточке


    // доступна всем
    // у всех в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // стр недоступна, если уже вошел
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




    // доступна всем
    // у всех в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // стр недоступна, если уже вошел


    // в мидлу проверку на уже вошел
    mainRouter.get(`/login`, (req, res) => {
      if (req.cookies.auth) {
        res.redirect(`/`);
      }
    }, (_, res) =>
      res.render(`auth/login`, {
        email: ``,
        [`user_password`]: ``,
        errorMessage: ``,
      }));



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




    // доступна всем
    // Для гостей в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // Для читателей в шапке отображается кнопка новая публикация аватар пользователя, имя, фамилия и ссылка «Выход»;
    mainRouter.get(`/`, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), async (req, res) => {
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
        cookies,
      } = req;



      console.log('~~~~~~~~~~~~~~~~~', process.env.JWT_ACCESS_SECRET);

      // вернет закодир в токене данные (verify)

      // сдел мидлу - проверка куков + возврат verify данных и по ним отрисовка

      // при созд токена в табл заносим оба токена
      console.log('SSSSSSSSSSSSSSSSSSSSSSS~~~~~~~~~~~~~~~~~~~~', await jwt.verify(cookies.auth.accessToken, process.env.JWT_ACCESS_SECRET));





      res.render(`main/main`, {
        themesData: getExistThemes(allCategories, publicationsData),
        mostCommented: getMostCommentedItems(publicationsData),
        lastComments: getLastComments(lastCommentsData),
        cardData: getCardData(paginationData),
        pages: getPages(publicationsCount),
        currentPage: pageNumber ?? 1,


        // ф-я проверки авторизации
        //isAuthorized: true,
      });
    });





    




    





    // Для гостей в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // Для читателей в шапке отображается кнопка новая публикация аватар пользователя, имя, фамилия и ссылка «Выход»;
    mainRouter.get(`/search`, getSearchDataMiddleware(api), (req, res) => {
      const {query: {search}, result} = req;

      res.render(`search/search`, {
        searchData: getResultData(search, result),
        searchValue: search,


        isAuthorized: true,

      });
    });



    // Для гостей в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // Для читателей в шапке отображается кнопка новая публикация аватар пользователя, имя, фамилия и ссылка «Выход»;
    mainRouter.get(`/404`, (_, res) => res.render(`errors/404`));



    // Для гостей в шапке страницы отображается ссылки «Регистрация» и «Вход»;
    // Для читателей в шапке отображается кнопка новая публикация аватар пользователя, имя, фамилия и ссылка «Выход»;
    mainRouter.get(`/500`, (_, res) => res.render(`errors/500`));

    return mainRouter;
  },
};
