const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const {define} = require(`../db-models/index`);
const {getServerConfig} = require(`./server-config`);

const {
  CATAGORIES_MOCK,
  PUBLICATIONS_MOCK,
  ROLES_MOCK,
  USERS_MOCK,
  COMMENTS_MOCK,
  PUBLICATIONS_CATEGORIES_MOCK,
  FIRST_UPDATED_PUBLICATION,
  FIRST_PUBLICATION_BY_ID,
  COMMENTS_FIRST_PUBLICATION_BY_ID,
  USED_CATEGORIES_FIRST_PUBLICATION_BY_ID,
  NEW_PUBLICATION,
  FINDED_COMMENTS_PUBLICATION,
} = require(`../data-service/tests/mock-data`);

const {getUpdatedData} = require(`../data-service/tests/test-utils`);

describe(`Test server REST API`, () => {
  let serverInstance;

  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

  const dbModels = define(mockDB);
  const {app} = getServerConfig(dbModels);

  const {Category, Publication, Role, User, Comment, PublicationsCategories} = dbModels;

  beforeEach(async () => {
    await mockDB.authenticate();
    await mockDB.sync({force: true});

    await Role.bulkCreate(ROLES_MOCK.map((role) => ({[`user_role`]: role})));
    await Category.bulkCreate(CATAGORIES_MOCK.map((category) => ({[`category_name`]: category})));
    await User.bulkCreate(USERS_MOCK.map((user) => user));
    await Publication.bulkCreate(PUBLICATIONS_MOCK.map((publication) => publication));
    await Comment.bulkCreate(COMMENTS_MOCK.map((comment) => comment));
    await PublicationsCategories.bulkCreate(PUBLICATIONS_CATEGORIES_MOCK.map((connection) => connection));

    serverInstance = app.listen(5000);
  });

  afterEach(async () => {
    await serverInstance.close();
  });

  it(`should return status 200 & data for get request /api/articles`, async () => {
    const {
      body: {publicationsCount, publicationsData, paginationData, lastCommentsData},
      statusCode
    } = await request(serverInstance).get(`/api/articles`);

    const updatedPublicationsData = getUpdatedData(publicationsData);
    const updatedPaginationData = getUpdatedData(paginationData);

    const lastCommentFirstElement = {
      id: 1,
      comment_text: 'Это где ж такие красоты?',
      data_comment: lastCommentsData[0][`data_comment`],
      user_id: 1,
      publication_id: 1,
      comment_owner: 'Vasya Vasya',
    };

    expect(statusCode).toBe(200);

    expect(publicationsCount).toEqual(4);
    expect(updatedPublicationsData[0]).toEqual(FIRST_UPDATED_PUBLICATION);
    expect(updatedPaginationData[0]).toEqual(FIRST_UPDATED_PUBLICATION);
    expect(lastCommentsData[0]).toEqual(lastCommentFirstElement);
  });

  it(`should return status 200 & data for get request /articles/:articleId`, async () => {
    const {
      body: {publication, publicationComments, usedCategoriesData},
      statusCode
    } = await request(serverInstance).get(`/api/articles/1`);

    expect(statusCode).toBe(200);

    expect(publication).toEqual(FIRST_PUBLICATION_BY_ID);
    expect(publicationComments[0]).toEqual(COMMENTS_FIRST_PUBLICATION_BY_ID);
    expect(usedCategoriesData).toEqual(USED_CATEGORIES_FIRST_PUBLICATION_BY_ID);
  });

  it(`should return status 200 & data for get request /categories`, async () => {
    const {
      body: allCategories,
      statusCode
    } = await request(serverInstance).get(`/api/categories`);

    const testedData = CATAGORIES_MOCK.map((item, index) => ({
      id: index + 1,
      [`category_name`]: item,
    }));

    expect(statusCode).toBe(200);

    expect(allCategories).toEqual(expect.arrayContaining(testedData));
  });

  it(`should return status 200 & new publication for post request /api/articles`, async () => {
    const {statusCode} = await request(serverInstance).post(`/api/articles`).send(NEW_PUBLICATION);

    expect(statusCode).toBe(200);

    const {body: {publicationsData}} = await request(serverInstance).get(`/api/articles`);

    const newPublication = publicationsData.find(({title}) => title === `Тест`);
    const {id, publication_date, categories, comments, publication_owner} = newPublication;

    const updatedPublication = {
      ...NEW_PUBLICATION,
      id,
      publication_date,
      categories,
      comments,
      publication_owner,
    };

    expect(newPublication).toEqual(updatedPublication);
  });

  it(`should return status 200 & updated publication for put request /api/articles/:articleId`, async () => {
    const {statusCode} = await request(serverInstance).put(`/api/articles/1`).send({title: `Test`});

    expect(statusCode).toBe(200);

    const {body: {publication: {title}}} = await request(serverInstance).get(`/api/articles/1`);

    expect(title).toEqual(`Test`);
  });

  it(`should return status 200 & delete publication for delete request /api/articles/:articleId`, async () => {
    const {statusCode} = await request(serverInstance).delete(`/api/articles/1`);

    expect(statusCode).toBe(200);

    const {body: {publicationsData}} = await request(serverInstance).get(`/api/articles`);

    const searchResult = publicationsData.find(({id}) => id === 1);

    expect(searchResult).toBeUndefined();
  });

  it(`should return status 200 & all comments for publication for get request /api/articles/:articleId/comments`, async () => {
    const {statusCode, body} = await request(serverInstance).get(`/api/articles/1/comments`);

    expect(statusCode).toBe(200);
    expect(body).toEqual(FINDED_COMMENTS_PUBLICATION);
  });

  it(`should return status 200 & delete comment of publication for delete request api/articles/:articleId/comments/:commentId`, async () => {
    const {body: publicationComments} = await request(serverInstance).get(`/api/articles/1/comments`);

    const firstCommentText = publicationComments[0][`comment_text`];

    const {statusCode} = await request(serverInstance).delete(`/api/articles/1/comments/1`);

    expect(statusCode).toBe(200);

    const {body: afterDeletePublicationComments} = await request(serverInstance).get(`/api/articles/1/comments`);

    const hasDeletedComment = afterDeletePublicationComments.find(({comment_text}) => comment_text === firstCommentText);

    expect(hasDeletedComment).toBeUndefined();
  });

  it(`should return status 200 & add new comment of publication for post request api/articles/:articleId/comments`, async () => {

    const {statusCode} = await request(serverInstance).post(`/api/articles/1/comments`).send({
      message: 'Test'
    });

    expect(statusCode).toBe(200);

    const {body: publicationComments} = await request(serverInstance).get(`/api/articles/1/comments`);

    const searchedNewPublicationText = Boolean(publicationComments.find(({comment_text}) => comment_text === `Test`));

    expect(searchedNewPublicationText).toEqual(true);
  });

  it(`should return status 200 & get category for get request api/articles/category/:categoryId`, async () => {
    const {statusCode, body: categoryById} = await request(serverInstance).get(`/api/articles/category/1`);

    expect(statusCode).toBe(200);
    expect(categoryById.categoryName).toEqual(CATAGORIES_MOCK[0]);
  });

  it(`should return status 404 by unecessary id for get request /api/articles/:articleId`, async () => {
    const {statusCode} = await request(serverInstance).get(`/api/articles/111`);
    expect(statusCode).toBe(404);
  });

  it(`should return status 400 by no sended arguments for put request /api/articles/1`, async () => {
    const {statusCode} = await request(serverInstance).put(`/api/articles/1`).send({});
    expect(statusCode).toBe(400);
  });
});
