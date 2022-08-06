const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /coffee_drinks should return a list of coffee drinks', async () => {
    const resp = await request(app).get('/coffee_drinks');
    expect(resp.body.length).toEqual(5);
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String)
    });
  });
  it('#GET /coffee_drinks/:id should return coffee drink detail', async () => {
    const resp = await request(app).get('/coffee_drinks/1');
    expect(resp.body).toEqual({
      name: expect.any(String),
      milk: expect.any(Boolean),
      oz: expect.any(Number)
    });
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});

