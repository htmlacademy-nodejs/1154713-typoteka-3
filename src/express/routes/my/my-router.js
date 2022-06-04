'use strict';

const {Router} = require(`express`);

const {getUsersRecordData, getUpdatedCommentsData} = require(`../../common/utils`);
const {getAllArticlesMiddleware} = require(`../../common/middlewares`);

module.exports = {
  myRouter: (api) => {
    const myRouter = new Router();




    myRouter.get(`/`, getAllArticlesMiddleware(api), (req, res) => {
      const {allArticles} = req;


      console.log('getUsersRecordData', getUsersRecordData(allArticles));



      res.render(`admin/my`, {
        myData: getUsersRecordData(allArticles),
      });
    });






    myRouter.get(`/comments`, getAllArticlesMiddleware(api), (req, res) => {
      const {allArticles} = req;
      res.render(`admin/comments`, {
        allPublicationCommentsData: getUpdatedCommentsData(allArticles),
      });
    });

    myRouter.get(`/categories`, (_, res) => res.render(`admin/all-categories`));

    return myRouter;
  },
};
