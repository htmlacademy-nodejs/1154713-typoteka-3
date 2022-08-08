'use strict';

const {Router} = require(`express`);

const {getUsersRecordData, getUpdatedCommentsData} = require(`../../common/utils`);
const {getAllArticlesMiddleware, getAllCategoriesMiddleware, checkCookiesData} = require(`../../common/middlewares`);

module.exports = {
  myRouter: (api) => {
    const myRouter = new Router();

    myRouter.get(`/`, checkCookiesData, getAllArticlesMiddleware(api), (req, res) => {
      const {allArticles: {publicationsData}, authorizedData} = req;
      res.render(`admin/my`, {
        myData: getUsersRecordData(publicationsData),
        authorizedData,
      });
    });

    myRouter.get(`/comments`, checkCookiesData, getAllArticlesMiddleware(api), (req, res) => {
      const {allArticles: {publicationsData}, authorizedData} = req;
      res.render(`admin/comments`, {
        allPublicationCommentsData: getUpdatedCommentsData(publicationsData),
        authorizedData,
      });
    });

    myRouter.get(`/categories`, checkCookiesData, getAllCategoriesMiddleware(api), (req, res) => {
      const {allCategories, authorizedData} = req;
      res.render(`admin/all-categories`, {
        allCategories,
        authorizedData,
      });
    });

    return myRouter;
  },
};
