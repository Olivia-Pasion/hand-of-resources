const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /ac_villagers should return a list of villagers', async () => {
    const resp = await request(app).get('/ac_villagers');
    expect(resp.body.length).toEqual(5);
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });
  
  it('#GET /ac_villagers/:id should return villager detail', async () => {
    const resp = await request(app).get('/ac_villagers/1');
    expect(resp.body).toEqual({
      name: expect.any(String),
      species: expect.any(String),
      catchphrase: expect.any(String)
    });

  });
  
  it('#POST /ac_villagers should add a new villager', async () => {
    const resp = await request(app).post('/ac_villagers').send({ name: 'Yuka', species: 'Koala', catchphrase: 'tsk tsk' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      species: expect.any(String),
      catchphrase: expect.any(String)
    });
  });

  it('#DELETE /ac_villagers/:id should delete a villager from the table', async () => {
    const resp = await request(app).delete('/ac_villagers/1');
    console.log(resp.status);
    expect(resp.status).toBe(200);
    
    const villagerResp = await request(app).get('/ac_villagers/1');
    expect(villagerResp.status).toBe(404);
    console.log(villagerResp.status);
  });
  afterAll(async () => {
    await setup (pool);
    pool.end();
  });
});
