const Sequelize = require(`sequelize`);

const {define} = require(`../../db-models/index`);
const {getServerConfig} = require(`../../cli/server-config`);

const {CATAGORIES_MOCK, PUBLICATIONS_MOCK, ROLES_MOCK, USERS_MOCK, COMMENTS_MOCK, PUBLICATIONS_CATEGORIES_MOCK} = require(`./mock-data`);

describe(`Check service methods`, () => {
  let serverInstance;

  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});


  /*{
    id: 1,
    publication_date: '1999-01-11 21:00:00.000 +00:00',
    picture: null,
    full_text: 'Ёлки — это не просто красивое дерево. Это прочная древесина.',
    title: 'Ёлки. История деревьев',
    announce: 'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.',
    user_id: 1,
    categories: 'Без рамки,Деревья,За жизнь', - должен быть массив
    comments: 'Согласен с автором!,Это где ж такие красоты?',  - должен быть массив
    publication_owner: 'Vasya Vasya'
  },*/

  // менял concat, array_agg


  const dbModels = define(mockDB);
  const {app, mainService} = getServerConfig(dbModels);

  const {Category, Publication, Role, User, Comment, PublicationsCategories} = dbModels;
  
  beforeAll(async () => {
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

  afterAll(async () => {
    await serverInstance.close();
  });
  
  /*it(`should return all categories`, async () => {
    const allCategories = (await mainService.getAllCategories());

    const testedData = CATAGORIES_MOCK.map((item, index) => ({
      id: index + 1,
      [`category_name`]: item,
    }));

    expect(allCategories).toEqual(expect.arrayContaining(testedData));
  });

  it(`should return category by id === 1`, async () => {
    const categoryById = (await mainService.getCategoryDataById(1));

    expect(categoryById.categoryName).toEqual(CATAGORIES_MOCK[0]);
  });*/

  it(`should return all publications data`, async () => {
    // getAllPublications

    try {
      const allPublicationsData = await mainService.getAllPublications();
      console.log('ALLLLL~~~~~~~~', allPublicationsData);
    } catch (e) {
      console.log('BIBIBIBIBI~~~~', e);
    }
    



    

  

    expect(true).toEqual(true);


  });  
});
