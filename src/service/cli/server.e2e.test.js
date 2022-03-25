const {promises: {readFile}} = require(`fs`);

const request = require(`supertest`);

const {getServerConfig} = require(`./server-config`);
const {getDataFromFile} = require(`./utils`);

describe(`Test server REST API`, () => {
  let serverConfig;
  let fileData;
  let categoriesData;

  beforeAll(async () => {
    fileData = await readFile(`mock.json`);
    categoriesData = await getDataFromFile(`./data/categories.txt`);
  });

  beforeEach(() => {
    serverConfig = getServerConfig(JSON.parse(fileData), categoriesData);
  });

  it(`should return status 200 for get /post`, async () => {
    const result = await request(serverConfig).get(`/post`);
    expect(result.statusCode).toBe(200);
  });

  it(`should return status 200 for get /api/articles`, async () => {
    const result = await request(serverConfig).get(`/api/articles`);
    expect(result.statusCode).toBe(200);
  });

  it(`should return status 200 for get /api/categories`, async () => {
    const result = await request(serverConfig).get(`/api/categories`);
    expect(result.statusCode).toBe(200);
  });

  it(`should return item with id PHfSY9 /api/articles/PHfSY9`, async () => {
    const {body: {id}} = await request(serverConfig).get(`/api/articles/PHfSY9`);
    expect(id).toBe(`PHfSY9`);
  });

  it(`shouldn return status 404 by get unnecessary id 111 /api/articles/111`, async () => {
    const {statusCode} = await request(serverConfig).get(`/api/articles/111`);
    expect(statusCode).toBe(404);
  });

  it(`should return comments for item with id PHfSY9 /api/articles/PHfSY9/comments`, async () => {
    const {body} = await request(serverConfig).get(`/api/articles/PHfSY9/comments`);
    expect(body.length).toBeGreaterThan(0);
  });

  it(`should return status 200 'как' in title /api/search`, async () => {
    const {statusCode} = await request(serverConfig).get(`/api/search`).query({
      title: `как`
    })
    expect(statusCode).toBe(200);
  });

  it(`should return status 404 by search unnecessary text in title in /api/search`, async () => {
    const {statusCode} = await request(serverConfig).get(`/api/search`).query({
      title: `111`
    });
    expect(statusCode).toBe(404);
  });

  it(`should return items without id PHfSY9 by delete api /api/articles/PHfSY9`, async () => {
    const {body} = await request(serverConfig).delete(`/api/articles/PHfSY9`);
    expect(body.find(({id}) => id === `PHfSY9`)).toBeUndefined();
  });

  it(`should return comments without id lUC2nW in item id PHfSY9 by delete api /api/articles/PHfSY9/comments/lUC2nW`, async () => {
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
  });

  it(`should return items with new comment by post api /api/articles/PHfSY9/comments`, async () => {
    const {body} = await request(serverConfig).post(`/api/articles/PHfSY9/comments`).send({
      text: `111`,
    });

    const {comments} = body.find(({id}) => id === `PHfSY9`);

    expect(comments.find(({text}) => text === `111`)).toHaveProperty(`text`, `111`);
  });
});
