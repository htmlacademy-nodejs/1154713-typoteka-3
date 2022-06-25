const Sequelize = require(`sequelize`);

const {define} = require(`../../db-models/index`);
const {getServerConfig} = require(`../../cli/server-config`);







//const {serverConfig: {app, mainService}, mockDB, dbModels: {Category, Publication}} = require(`./mock-db-server`);
const {CATAGORIES_MOCK, PUBLICATIONS_MOCK} = require(`./mock-data`);



// del data dir ???



describe(`Check service methods`, () => {
  let serverInstance;
  


  // ошибка с примари кей null
  beforeAll(async () => {


    const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
    const dbModels = define(mockDB);

    const {app, mainService} = getServerConfig(dbModels);

    await mockDB.authenticate();

    await mockDB.sync({force: true});


    const {Category, Publication} = dbModels;

    await Category.bulkCreate(CATAGORIES_MOCK.map((category) => ({[`category_name`]: category})));

    try {
      await Publication.bulkCreate(PUBLICATIONS_MOCK.map(({date, picture, fullText, title, announce, userId}) => ({
        [`publication_date`]: date,
        picture,
        [`full_text`]: fullText,
        title,
        announce,
        [`user_id`]: userId,
      })));
    } catch (err) {
      console.log('ERRRRRRRRRRR', err);
    }

    



    
    

    
    serverInstance = app.listen(3000);
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
  });*/

  /*it(`should return category by id === 1`, async () => {
    const categoryById = (await mainService.getCategoryDataById(1));

    expect(categoryById.categoryName).toEqual(CATAGORIES_MOCK[0]);
  });*/






  


  it(`should return all publications data`, async () => {
    // getAllPublications



    





    expect(true).toEqual(true);


    //expect(1).toEqual(1);

  });








  /*it(`should return searched data`, async () => {
    
  });*/


  
});
