'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);

const articlesRouter = new Router();

const upload = multer({storage});

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

        // разобраться с категориями - см верстку из примера

        articlesRouter.post(`/add`, upload.single(`upload`), (req, res) => {
          const {body, file} = req;

          const offerData = {
            type: body.action,

            title: body.title,
            picture: file ? file.filename : ``,
            category: body.category,
            announcement: body.announcement,
            fullText: body[`full-text`],
          };


          res.json(offerData);

            
        });

        articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail.pug`));
        articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category.pug`));

        return articlesRouter;
    },
};
