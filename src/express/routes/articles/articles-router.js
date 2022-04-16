'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

module.exports = {
    articlesRouter: (api) => {
        articlesRouter.get(`/edit/:id`, async (req, res) => {
            const {params: {id}} = req;
            const article = await api.getArticle(id);

            res.render(`post/post.pug`, {
                pageTitle: 'Редактирование публикации',
                title: article.title,
                category: article.category,
                announce: article.announce,
                fullText: article.fullText,
            });
        });

        articlesRouter.get(`/add`, (_, res) => {
            res.render(`post/post.pug`, {
                pageTitle: 'Новая публикация',
            });
        });

        articlesRouter.post(`/add`, (req, res) => {

            // добавить обработку кнопки загрузок файлов
            // орг загрузуку файлов
            const zzz = req.body;

            console.log('RESS', zzz);





            res.json(zzz);


            
        });

        articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail.pug`));
        articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category.pug`));

        return articlesRouter;
    },
};
