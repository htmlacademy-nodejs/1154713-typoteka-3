const request = require(`supertest`);
const {server} = require(`./server`);

describe(`Test server REST API`, () => {
  let response;

  beforeAll(async () => {
    response = await request(server).get(`/post`);
  });

  it(`should return status 200 for get /post`, () => {
    expect(response.statusCode).toBe(200);
  });
});
