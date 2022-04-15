'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

/*myRouter.get(`/comments`, (_, res) => res.render(`admin/comments.pug`));
myRouter.get(`/`, (_, res) => res.render(`admin/my.pug`));
myRouter.get(`/categories`, (_, res) => res.render(`admin/all-categories.pug`));

module.exports = myRouter;*/

module.exports = {
    myRouter: (api) => {
        myRouter.get(`/`, async (_, res) => {

            console.log(await api.getAllArticles());
            res.render(`admin/my.pug`);
        });



        myRouter.get(`/comments`, async (_, res) => {

            const allArticles = await api.getAllArticles();

            console.log(allArticles.map(({id, comments}) => ({
                [id]: comments,
            })));

            res.render(`admin/comments.pug`);
        });



        myRouter.get(`/categories`, (_, res) => res.render(`admin/all-categories.pug`));

        return myRouter;
    },
};