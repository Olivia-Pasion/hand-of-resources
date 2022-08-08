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
  it('#POST /movies should add a new movie', async () => {
    const resp = await request(app).post('/movies').send({ title: 'Pulp Fiction', director: 'Quentin Tarantino', premiere: '10-14-1994' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      director: expect.any(String),
      premiere: expect.any(String)
    });
  });
  it('#PUT /movies/:id should update existing movie', async () => {
    const resp = await request(app).put('/movies/2').send({ premiere: '01-01-1901' });
    expect(resp.status).toBe(200);
    expect(resp.body.premiere).toBe('1901-01-01T08:00:00.000Z');
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});
