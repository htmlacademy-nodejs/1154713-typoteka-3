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

const {getAllArticlesMiddleware, getAllCategoriesMiddleware, getSearchDataMiddleware, setPageData} = require(`../../common/middlewares`);

module.exports = {
  mainRouter: (api) => {
    const mainRouter = new Router();

    // главная страница
    mainRouter.get(`/`, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), (req, res) => {
      const {
        allArticles: {
          publicationsData,
          lastCommentsData,
          publicationsCount
        },
        allCategories,
        query: {
          pageNumber,
        },
      } = req;

      console.log('REQ~~~~~~~~~~~~~~~~~~', pageNumber);


      // см где еще может быть пагинация и проверить эти места
      console.log('COUNT~~~~~~~~~~~~~~~', publicationsCount);

      console.log('PAG~~~~~~~~~~~~~~~~~~', getPages(publicationsCount, pageNumber));
      
      
      /*ul.preview__pagination.pagination
            li
              a.pagination__button.button.button--backwards.button--disabled(href='#', aria-label='Страница назад') Назад
            li.pagination__item.pagination__item--active
              a 1
            li.pagination__item
              a
                input.button(name='pageNumber', value=2, type='submit')
            li.pagination__item
              a 3
            li.pagination__item
              a(href='#') 4
            li.pagination__item
              a(href='#') 5
            li
              a.pagination__button.button.button--forward(href='#', aria-label='Страница вперед') Вперед*/


              /*li
              a.pagination__button.button.button--backwards(href='?pageNumber=prev') Назад
            each page in pages
              li.pagination__item
                a.button(href=`?pageNumber=${page + 1}`) #{page + 1}
            li
              a.pagination__button.button.button--forward(href='?pageNumber=next') Вперед*/


      res.render(`main/main`, {
        themesData: getExistThemes(allCategories, publicationsData),
        mostCommented: getMostCommentedItems(publicationsData),
        lastComments: getLastComments(lastCommentsData),
        cardData: getCardData(publicationsData),


        pages: getPages(publicationsCount, pageNumber ?? 1),

        currentPage: pageNumber ?? 1,

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
