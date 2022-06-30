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

  /*it(`should return status 200 & data for get request /api/articles`, async () => {
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
  });*/

  /*it(`should return status 200 & data for get request /articles/:articleId`, async () => {
    const {
      body: {publication, publicationComments, usedCategoriesData},
      statusCode
    } = await request(serverInstance).get(`/api/articles/1`);

    expect(statusCode).toBe(200);

    expect(publication).toEqual(FIRST_PUBLICATION_BY_ID);
    expect(publicationComments[0]).toEqual(COMMENTS_FIRST_PUBLICATION_BY_ID);
    expect(usedCategoriesData).toEqual(USED_CATEGORIES_FIRST_PUBLICATION_BY_ID);
  });*/

  /*it(`should return status 200 & data for get request /categories`, async () => {
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
  });*/

  /*it(`should return status 200 & new publication for post request /api/articles`, async () => {
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
  });*/ 









  /*it(`should return comments without id lUC2nW in item id PHfSY9 by delete api /api/articles/PHfSY9/comments/lUC2nW`, async () => {
    const {body} = await request(serverConfig).delete(`/api/articles/PHfSY9/comments/lUC2nW`);
    const item = body.find(({id}) => id === `PHfSY9`);
    expect(item.comments.find(({id}) => id === `lUC2nW`)).toBeUndefined();
  });

  it(`should return item with id PHfSY9 with edited title, who contains text '111' by put api /api/articles/PHfSY9`, async () => {
    const {body} = await request(serverConfig).put(`/api/articles/PHfSY9`).send({
      title: `111`,
    });
    expect(body.find(({id}) => id === `PHfSY9`).title).toBe(`111`);
  });

  it(`should return 400 error with no sended arguments in put api /api/articles/PHfSY9`, async () => {
    const {statusCode} = await request(serverConfig).put(`/api/articles/PHfSY9`).send({});
    expect(statusCode).toBe(400);
  });

  it(`should return items with new item by post api /api/articles`, async () => {
    const {body} = await request(serverConfig).post(`/api/articles`).send({
      title: `111`,
      announce: `111`,
      fullText: `111`,
      category: [`111`],
    });

    const item = body.find(({title}) => title === `111`);

    expect(item).toHaveProperty(`title`, `111`);
    expect(item).toHaveProperty(`announce`, `111`);
    expect(item).toHaveProperty(`fullText`, `111`);
    expect(item).toHaveProperty(`category`, [`111`]);
  });*/

  
});
