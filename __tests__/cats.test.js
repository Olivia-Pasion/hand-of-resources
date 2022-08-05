const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /cats should provide a list of cats', async () => {
    const resp = await request(app).get('/cats');
    expect(resp.body.length).toEqual(5);
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      breed: expect.any(String),
      longHair: expect.any(Boolean)
    });
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});



