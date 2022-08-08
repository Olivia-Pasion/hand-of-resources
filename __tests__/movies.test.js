const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /movies should return a list of movies', async () => {
    const resp = await request(app).get('/movies');
    expect(resp.body.length).toEqual(5);
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String)
    });
  });
  it('#GET /movies/:id should return a movie detail', async () => {
    const resp = await request(app).get('/movies/1');
    expect(resp.body).toEqual({
      title: expect.any(String),
      director: expect.any(String),
      premiere: expect.any(String)
    });
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});
