const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /art_museums should return a list of museums', async () => {
    const resp = await request(app).get('/art_museums');
    expect(resp.body.length).toEqual(5);
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String)
    });
  });
  it('#GET /art_museums/:id should return museum details', async () => {
    const resp = await request(app).get('/art_museums/2');
    expect(resp.body).toEqual({
      name: expect.any(String),
      location: expect.any(String)
    });
  });
  it('#POST /art_museums adds a new museum to list', async () => {
    const resp = await request(app).post('/art_museums').send({
      name: 'Guggenheim', location: 'New York' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String)
    });
  });
  it('#PUT /art_museums updates a museum attribute', async () => {
    const resp = await request(app).put('/art_museums/1').send({ location: 'San Francisco' });
    expect(resp.status).toBe(200);
    expect(resp.body.location).toBe('San Francisco');
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});
