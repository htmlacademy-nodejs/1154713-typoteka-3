'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const storage = require(`../../common/multer-storage`);
const {
  getArticleMiddleware,
  setNewPostMiddleware,
  getAllArticlesMiddleware,
  getAllCategoriesMiddleware,
  getDataByCategoryMiddleware,
  setNewCommentMiddleware,
  editPublicationMiddleware,
  checkCookiesData,
} = require(`../../common/middlewares`);
const {getExistThemes, getCardData} = require(`../../common/utils`);
const {renderPostDetailPage, renderPostEditPage, renderAddPostPage} = require(`./utils`);

const upload = multer({storage});

module.exports = {
  articlesRouter: (api) => {
    const articlesRouter = new Router();

    articlesRouter.get(`/edit/:id`, checkCookiesData, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication}, params: {id}, errorData, authorizedData} = req;

      renderPostEditPage({
        errorData,
        publication,
        id,
        res,
        authorizedData,
      });
    });

    articlesRouter.post(`/edit/:id`,
        checkCookiesData,
        upload.single(`upload`),
        editPublicationMiddleware(api),
        getArticleMiddleware(api),
        (req, res) => {
          const {articleData: {publication}, params: {id}, errorData, authorizedData} = req;

          renderPostEditPage({
            errorData,
            publication,
            id,
            res,
            authorizedData,
          });
        });

    articlesRouter.get(`/add`, checkCookiesData, (req, res) => {
      const {errorData, authorizedData} = req;

      renderAddPostPage({
        errorData,
        res,
        authorizedData,
      });
    });

    articlesRouter.post(`/add`,
        checkCookiesData,
        upload.single(`upload`),
        setNewPostMiddleware(api),
        (req, res) => {
          const {errorData, authorizedData} = req;

          if (errorData) {
            renderAddPostPage({
              errorData,
              res,
              authorizedData,
            });
          }
        }
    );

    articlesRouter.get(`/:id`, checkCookiesData, getArticleMiddleware(api), (req, res) => {
      const {articleData: {publication, publicationComments, usedCategoriesData}, params: {id}, errorData, authorizedData} = req;

      console.log('AAAA~~~~~~~~~~~~~', authorizedData);


      renderPostDetailPage({
        id,
        errorData,
        publication,
        usedCategoriesData,
        publicationComments,
        res,
        isAuthorized: !!Object.keys(authorizedData).length,
        authorizedData,
      });
    });

    articlesRouter.post(`/:id/comments`, checkCookiesData, getArticleMiddleware(api), setNewCommentMiddleware(api), (req, res) => {
      const {articleData: {publication, publicationComments, usedCategoriesData}, params: {id}, errorData, authorizedData} = req;

      if (errorData) {
        renderPostDetailPage({
          id,
          errorData,
          publication,
          usedCategoriesData,
          publicationComments,
          res,
          isAuthorized: !!Object.keys(authorizedData).length,
          authorizedData,
        });
      } else {
        res.redirect(`/articles/${req.params.id}`);
      }
    });

    articlesRouter.get(`/category/:id`, checkCookiesData, getAllArticlesMiddleware(api), getAllCategoriesMiddleware(api), getDataByCategoryMiddleware(api), (req, res) => {
      const {allArticles: {publicationsData}, allCategories, selectionByCategory: {categoryName}, authorizedData} = req;

      const filteredCardData = getCardData(publicationsData).reduce((result, data) => {
        const searchedCategory = data.categories.find((item) => item === categoryName);

        if (searchedCategory) {
          result.push(data);
        }

        return result;
      }, []);

      const pageData = {
        categoryName,
        themesData: getExistThemes(allCategories, publicationsData),
        cardData: filteredCardData,
        isAuthorized: !!Object.keys(authorizedData).length,
        authorizedData,
      };

      res.render(`main/articles-by-category`, pageData);
    });

    return articlesRouter;
  },
};
