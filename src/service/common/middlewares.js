'use strict';

const {hash, compare} = require(`bcrypt`);

const {SERVER_SERVICE_ERROR, ANSWER_ERROR, SALT_ROUNDS} = require(`./consts`);

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
      [`data_comment`]: (new Date()).toISOString(),
    };

    try {
      req.newComment = await service.addNewComment(commentData);
      next();
    } catch (e) {
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
  setNewUser: (service) => async (req, res, next) => {
    const {body} = req;

    const encryptedPassword = await hash(body[`user_password`], SALT_ROUNDS);
    body[`user_password`] = encryptedPassword;

    try {
      const result = await service.setNewUser(body);

      if (result.isSameEmailUserExist) {
        req.sameUserError = `Пользователь с таким email уже существует`;
      }

      next();
    } catch {
      next(new Error(SERVER_SERVICE_ERROR));
    }
  },

  checkAuthentification: (service) => async (req, res, next) => {
    const {body} = req;

    const userInDB = await service.findUserEmail(body.email);

    if (!userInDB) {
      res.status(200).send(`Пользователя с таким email не существует`);
      return;
    }

    const isPasswordCompare = await compare(body[`user_password`], userInDB[`user_password`]);

    if (!isPasswordCompare) {
      res.status(200).send(`Неверный пароль`);
      return;
    }

    next();
  },
};
