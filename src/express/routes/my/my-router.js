'use strict';

const {Router} = require(`express`);

const {getUsersRecordData, getUpdatedCommentsData} = require(`../../common/utils`);

const myRouter = new Router();

module.exports = {
  myRouter: (api) => {
    myRouter.get(`/`, async (_, res) => {
      const allArticles = await api.getAllArticles();
      res.render(`admin/my.pug`, {
        myData: getUsersRecordData(allArticles),
      });
    });

    myRouter.get(`/comments`, async (_, res) => {
      const allArticles = await api.getAllArticles();
      res.render(`admin/comments.pug`, {
        allPublicationCommentsData: getUpdatedCommentsData(allArticles),
      });
    });

    myRouter.get(`/categories`, (_, res) => res.render(`admin/all-categories.pug`));

    return myRouter;
  },
};
