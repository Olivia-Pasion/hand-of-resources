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
  it('#POST /coffee_drinks should add a new drink', async () => {
    const resp = await request(app).post('/coffee_drinks').send({ name: 'latte', milk: true, oz: 8 });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      milk: expect.any(Boolean),
      oz: expect.any(Number)
    });
  });
  it('#PUT /coffee_drinks should update a coffee drink', async () => {
    const resp = await request(app).put('/coffee_drinks/2').send({
      oz: 12
    });
    expect(resp.status).toBe(200);
    expect(resp.body.oz).toBe(12);
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});

