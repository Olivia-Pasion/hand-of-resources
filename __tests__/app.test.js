const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const request = require('supertest');
// const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('example test - delete me!', () => {
    expect(1).toEqual(1);
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});
