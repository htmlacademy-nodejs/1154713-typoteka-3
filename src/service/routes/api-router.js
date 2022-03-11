'use strict';

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);

const {SERVER_SERVICE_ERROR, ANSWER_ERROR, ARGUMENT_ERROR, BODY_ARGUMENTS: {CATEGORY}} = require(`../cli/consts`);
const {hasNeededBodyKeys, getDate} = require(`../cli/utils`);

const apiRouter = new Router();

apiRouter.get(`/articles`, (req, res, next) => {
  try {
    res.json(JSON.parse(req.mockData));
  } catch {
    next({status: SERVER_SERVICE_ERROR});
  }
});

apiRouter.get(`/articles/:articleId`, (req, res, next) => {
  const {mockData, params: {articleId}} = req;
  const result = JSON.parse(mockData).find(({id}) => id === articleId);

  if (!result) {
    return next({status: ANSWER_ERROR});
  }

  return res.json(result);
});

apiRouter.get(`/categories`, (req, res) => {
  res.send(req.categories);
});

apiRouter.get(`/articles/:articleId/comments`, (req, res, next) => {
  const {mockData, params: {articleId}} = req;
  const result = JSON.parse(mockData).find(({id}) => id === articleId);

  if (!result) {
    return next({status: ANSWER_ERROR});
  }

  return res.json(result.comments);
});

// пример запроса для обработчика ниже - search?title=text
apiRouter.get(`/search`, (req, res, next) => {
  const {mockData, query} = req;
  const result = JSON.parse(mockData).filter(({title}) => title.indexOf(query.title) !== -1);

  if (!result.length) {
    return next({status: ANSWER_ERROR});
  }

  return res.json(result);
});

apiRouter.delete(`/articles/:articleId`, (req, res, next) => {
  const {mockData, params: {articleId}} = req;
  const data = JSON.parse(mockData);

  const item = data.find(({id}) => id === articleId);

  if (!item) {
    return next({status: ANSWER_ERROR});
  }

  return res.json(data.filter(({id}) => id !== articleId));
});

apiRouter.delete(`/articles/:articleId/comments/:commentId`, (req, res, next) => {
  const {mockData, params: {articleId, commentId}} = req;
  const data = JSON.parse(mockData);

  const item = data.find(({id}) => id === articleId);

  if (!item) {
    return next({status: ANSWER_ERROR});
  }

  const hasComment = item.comments.find(({id}) => id === commentId);

  if (!hasComment) {
    return next({status: ANSWER_ERROR});
  }

  const changedComments = item.comments.filter(({id}) => id !== commentId);

  const result = data.map((element) => {
    if (element.id === articleId) {
      return {
        ...element,
        comments: changedComments,
      };
    }

    return item;
  });

  return res.json(result);
});

apiRouter.put(`/articles/:articleId`, (req, res, next) => {
  const {mockData, params: {articleId}, body} = req;
  const data = JSON.parse(mockData);

  const item = data.find(({id}) => id === articleId);

  if (!item) {
    return next({status: ANSWER_ERROR});
  }

  if (!Object.keys(body).length) {
    return next({status: ARGUMENT_ERROR});
  }

  for (let key in body) {
    if (body.hasOwnProperty(key)) {
      item[key] = body[key];
    }
  }

  return res.json(item);
});

apiRouter.post(`/articles`, (req, res, next) => {
  const {body} = req;
  const bodyKeys = Object.keys(body);

  if (!hasNeededBodyKeys(bodyKeys) || !Array.isArray(body[CATEGORY])) {
    return next({status: ARGUMENT_ERROR});
  }

  return res.json({
    ...body,
    id: nanoid(6),
    createDate: getDate(),
    comments: [],
  });
});

apiRouter.post(`/articles/:articleId/comments`, (req, res, next) => {
  const {mockData, params: {articleId}, body: {text}} = req;
  const data = JSON.parse(mockData);

  const item = data.find(({id}) => id === articleId);

  if (!item) {
    return next({status: ANSWER_ERROR});
  }

  return res.json({
    ...item,
    comments: [...item.comments, {
      id: nanoid(6),
      text,
    }],
  });
});

module.exports = apiRouter;
