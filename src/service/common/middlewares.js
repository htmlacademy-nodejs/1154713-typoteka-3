'use strict';

const {SERVER_SERVICE_ERROR, ANSWER_ERROR, ARGUMENT_ERROR, COMMENT_ARGUMENTS} = require(`./consts`);

module.exports = {
  getAllPublicationsMiddleware: (service) => async (req, res, next) => {
    const {body: {pageNumber}} = req;

    try {
      req.allPublications = await service.getAllPublications(Number(pageNumber));
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  getPublicationByIdMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId}} = req;

    try {
      const result = await service.getPublicationById(articleId);

      req.publicationById = result;
      next();
    } catch {
      next(new Error(ANSWER_ERROR));
    }
  },
  getAllCategoriesMiddleware: (service) => async (req, res, next) => {
    try {
      req.allCategories = await service.getAllCategories();
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  setNewPublicationMiddleware: (service) => async (req, res, next) => {
    const {body} = req;

    try {
      req.newPublication = await service.setNewPublication(body);
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  updatePublicationMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId}, body} = req;

    try {
      req.updatedPublication = await service.updatePublication(articleId, body);
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  deletePublicationMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId}} = req;

    try {
      req.deleteResult = await service.deletePublication(articleId);
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  getCommentsPublicationMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId}} = req;

    try {
      req.commentsPublication = await service.getCommentsPublication(articleId);
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  deleteCommentMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId, commentId}} = req;

    try {
      req.deleteResult = await service.deleteComment(articleId, commentId);
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  addNewCommentMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId}, body} = req;

    const commentData = {
      [`comment_text`]: body.message,
      [`publication_id`]: articleId,
      // хардкод
      [`user_id`]: 1,
      // хардкод
      [`data_comment`]: `2022-11-01`,
    };

    try {
      req.newComment = await service.addNewComment(commentData);
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  getSearchedMiddleware: (service) => async (req, res, next) => {
    const {body: {search}} = req;

    try {
      const result = await service.getSearchedData(search);

      if (!result.length) {
        next(new Error(ANSWER_ERROR));
      }

      req.searchResult = result;
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  getCategoryDataById: (service) => async (req, res, next) => {
    const {params: {categoryId}} = req;

    try {
      const categoryData = await service.getCategoryDataById(categoryId);

      req.categoryData = categoryData;
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
};
