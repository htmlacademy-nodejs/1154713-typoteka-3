const Sequelize = require(`sequelize`);

const {define} = require(`../../db-models/index`);
const {getServerConfig} = require(`../../cli/server-config`);

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
} = require(`./mock-data`);
const { getUpdatedData } = require("./test-utils");

describe(`Check service methods`, () => {
  let serverInstance;

  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

  const dbModels = define(mockDB);
  const {app, mainService} = getServerConfig(dbModels);

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
  
  it(`should return all categories`, async () => {
    const allCategories = await mainService.getAllCategories();

    const testedData = CATAGORIES_MOCK.map((item, index) => ({
      id: index + 1,
      [`category_name`]: item,
    }));

    expect(allCategories).toEqual(expect.arrayContaining(testedData));
  });

  it(`should return category by id === 1`, async () => {
    const categoryById = await mainService.getCategoryDataById(1);

    expect(categoryById.categoryName).toEqual(CATAGORIES_MOCK[0]);
  });

  it(`should return all publications data`, async () => {
    const {publicationsCount, publicationsData, paginationData, lastCommentsData} = await mainService.getAllPublications();

    const updatedPublicationsData = getUpdatedData(publicationsData);
    const updatedPaginationData = getUpdatedData(paginationData);

    const lastCommentFirstElement = {
      id: 1,
      comment_text: 'Это где ж такие красоты?',
      data_comment: lastCommentsData[0].dataValues[`data_comment`],
      user_id: 1,
      publication_id: 1,
      comment_owner: 'Vasya Vasya',
    };

    expect(publicationsCount).toEqual(4);
    expect(updatedPublicationsData[0]).toEqual(FIRST_UPDATED_PUBLICATION);
    expect(updatedPaginationData[0]).toEqual(FIRST_UPDATED_PUBLICATION);
    expect(lastCommentsData[0].dataValues).toEqual(lastCommentFirstElement);
  });
  
  it(`should return publication by id`, async () => {
    const {publication, publicationComments, usedCategoriesData} = await mainService.getPublicationById(1);

    expect(publication).toEqual(FIRST_PUBLICATION_BY_ID);
    expect(publicationComments[0]).toEqual(COMMENTS_FIRST_PUBLICATION_BY_ID);
    expect(usedCategoriesData).toEqual(USED_CATEGORIES_FIRST_PUBLICATION_BY_ID);
  });

  it(`should return new setted publication`, async () => {
    await mainService.setNewPublication(NEW_PUBLICATION);

    const {publicationsData} = await mainService.getAllPublications();

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

  it(`should return updated publication`, async () => {
    await mainService.updatePublication(1, {title: `Test`});

    const {publication: {title}} = await mainService.getPublicationById(1);

    expect(title).toEqual(`Test`);
  });
  
  it(`should delete publication`, async () => {
    await mainService.deletePublication(1);

    const {publicationsData} = await mainService.getAllPublications();
    const searchResult = publicationsData.find(({id}) => id === 1);

    expect(searchResult).toBeUndefined();
  });

  it(`should return all comments for publication`, async () => {
    const result = await mainService.getCommentsPublication(1);

    expect(result).toEqual(FINDED_COMMENTS_PUBLICATION);
  });
  
  it(`should delete comment`, async () => {
    const publicationComments = await mainService.getCommentsPublication(1);

    const firstCommentText = publicationComments[0][`comment_text`];

    await mainService.deleteComment(1, 1);

    const afterDeletePublicationComments = await mainService.getCommentsPublication(1);

    const hasDeletedComment = afterDeletePublicationComments.find(({comment_text}) => comment_text === firstCommentText);

    expect(hasDeletedComment).toBeUndefined();
  });

  it(`should add new comment`, async () => {
    await mainService.addNewComment({
      comment_text: `Test`,
      data_comment: `2022-11-11`,
      user_id: 1,
      publication_id: 1,
    });

    const publicationComments = await mainService.getCommentsPublication(1);

    const searchedNewPublicationText = Boolean(publicationComments.find(({comment_text}) => comment_text === `Test`));

    expect(searchedNewPublicationText).toEqual(true);
  });
});
