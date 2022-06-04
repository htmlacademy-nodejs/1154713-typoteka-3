'use strict';

const {SERVER_SERVICE_ERROR, ANSWER_ERROR, ARGUMENT_ERROR, BODY_ARGUMENTS, COMMENT_ARGUMENTS} = require(`./consts`);

const {hasNeededBodyKeys} = require(`./utils`);

module.exports = {
  getAllPublicationsMiddleware: (service) => async (req, res, next) => {
    try {
      req.allPublications = await service.getAllPublications();
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  getPublicationByIdMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId}} = req;

    try {
      const result = await service.getPublicationById(articleId);

      if (!result) {
        next(new Error(ANSWER_ERROR));
      }

      req.publicationById = result;
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
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

    if (!hasNeededBodyKeys(Object.keys(body), BODY_ARGUMENTS)) {
      next(new Error(ARGUMENT_ERROR));
    }

    try {
      req.newPublication = await service.setNewPublication(body);
      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },
  updatePublicationMiddleware: (service) => async (req, res, next) => {
    const {params: {articleId}, body} = req;

    if (!Object.keys(body).length) {
      next(new Error(ARGUMENT_ERROR));
    }

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

    const preparedBody = {
      ...body,
      [`publication_id`]: articleId,
    };

    if (!hasNeededBodyKeys(Object.keys(preparedBody), COMMENT_ARGUMENTS)) {
      next(new Error(ARGUMENT_ERROR));
    }

    try {
      req.newComment = await service.addNewComment(preparedBody);
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
};
