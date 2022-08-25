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
      breed: expect.any(String)
    });
  });
  it('#GET /cats/:id provides cat detail', async () => {
    const resp = await request(app).get('/cats/1');
    expect(resp.body).toEqual({
      breed: expect.any(String),
      longHair: expect.any(Boolean)
    });
  });
  it('#POST /cats should add a new cat', async () => {
    const resp = await request(app).post('/cats').send({ breed: 'Ragdoll', longHair: true });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      breed: expect.any(String),
      longHair: expect.any(Boolean)
    });
  });
  it('#PUT /cats/:id should update existing cat', async () => {
    const resp = await request(app).put('/cats/2').send({ longHair: false 
    });
    expect(resp.status).toBe(200);
    expect(resp.body.longHair).toBe(false);
  });
  it('#DELETE /cats/:id should delete a cat from the table', async () => {
    const resp = await request(app).delete('/cats/1');
    expect(resp.status).toBe(200);
    
    const catResp = await request(app).get('/cats/1');
    expect(catResp.status).toBe(404);
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});



