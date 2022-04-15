'use strict';

const {Router} = require(`express`);

const {
    getExistThemes,
    getMostCommentedItems,
    getLastComments,
    getCardData
} = require(`../../common/utils`);

module.exports = {
    mainRouter: (api) => {
        const mainRouter = new Router();

        // главная страница
        mainRouter.get(`/`, async (_, res) => {
            const allArticles = await api.getAllArticles();
            const allCategories = await api.getAllCategories();
    
            res.render(`main/main.pug`, {
                themesData: getExistThemes(allCategories, allArticles),
                mostCommented: getMostCommentedItems(allArticles),
                lastComments: getLastComments(allArticles),
                cardData: getCardData(allArticles),
            })
        });
    
        // демо страниц авторизации\аутентификации
        mainRouter.get(`/register`, (_, res) => res.render(`auth/sign-up.pug`));
        mainRouter.get(`/login`, (_, res) => res.render(`auth/login.pug`));
    
        // демо вариантов страниц поиска
        mainRouter.get(`/search-1`, (_, res) => res.render(`search/search-1.pug`));
        mainRouter.get(`/search-2`, (_, res) => res.render(`search/search-2.pug`));
        mainRouter.get(`/search-3`, (_, res) => res.render(`search/search-3.pug`));
    
        // демо страниц с ошибками
        mainRouter.get(`/404`, (_, res) => res.render(`errors/404.pug`));
        mainRouter.get(`/500`, (_, res) => res.render(`errors/500.pug`));
    
        return mainRouter;
    }, 
};
