import request from 'supertest';
import app from '../app.js';

describe('Mocks Router', () => {
  it('GET /api/mocks/mockingpets returns pets', async () => {
    const res = await request(app).get('/api/mocks/mockingpets?count=2');
    if (res.status !== 200) throw new Error('Expected 200');
    if (!Array.isArray(res.body.payload)) throw new Error('Payload must be array');
  });

  it('GET /api/mocks/mockingusers returns users', async () => {
    const res = await request(app).get('/api/mocks/mockingusers?count=2');
    if (res.status !== 200) throw new Error('Expected 200');
    if (!Array.isArray(res.body.payload)) throw new Error('Payload must be array');
  });
});
