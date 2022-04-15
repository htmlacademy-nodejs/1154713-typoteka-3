'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

/*articlesRouter.get(`/edit/:id`, (_, res) => res.render(`post/post-edit.pug`));
articlesRouter.get(`/add`, (_, res) => res.render(`post/post.pug`));
articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail.pug`));
articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category.pug`));

module.exports = articlesRouter;*/

module.exports = {
    articlesRouter: (api) => {
        articlesRouter.get(`/edit/:id`, async (req, res) => {
            const {params: {id}} = req;

            console.log('REQQQQQQQ', id);

            console.log(await api.getArticle(id));
            
            res.render(`post/post-edit.pug`);
        });
        articlesRouter.get(`/add`, (_, res) => res.render(`post/post.pug`));
        articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail.pug`));
        articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category.pug`));

        return articlesRouter;
    },
};
