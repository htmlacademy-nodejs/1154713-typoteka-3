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

        articlesRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {

            // добавить обработку кнопки загрузок файлов
            // орг загрузуку файлов
            const {body, file} = req;

            console.log('BODY', body);
            console.log('FILE', file);


            const offerData = {
                picture: file ? file.filename : ``,
                sum: body.price,
                type: body.action,
                description: body.comment,
                title: body[`ticket-name`],
                category: Array.isArray(body.category) ? body.category : [body.category],
              };

              // код offerData
              /*async createOffer(data) {
                return await this._load(`/offers`, {
                  method: `POST`,
                  data
                });
              }*/
          
              try {
                /*await api.createOffer(`/offers`, offerData);
                res.redirect(`/my`);*/

                res.json(offerData);


              } catch (error) {
                res.redirect(`back`);
              }




            
        });

        articlesRouter.get(`/:id`, (_, res) => res.render(`post/post-detail.pug`));
        articlesRouter.get(`/category/:id`, (_, res) => res.render(`main/articles-by-category.pug`));

        return articlesRouter;
    },
};
