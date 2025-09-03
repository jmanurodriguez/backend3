import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import { config } from '../config/environment.js';

const MONGO_URL = config.mongoUrl;

const countExampleUsers = (list) => list.filter(u => typeof u.email === 'string' && u.email.endsWith('@example.com')).length;

describe('Mocks Router - generateData', () => {
  before(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('POST /api/mocks/generateData inserts users and pets into DB', async () => {
    const beforeUsersRes = await request(app).get('/api/users');
    if (beforeUsersRes.status !== 200) throw new Error('GET /api/users should return 200');
    const beforeExampleUsers = countExampleUsers(beforeUsersRes.body.payload || []);

    const beforePetsRes = await request(app).get('/api/pets');
    if (beforePetsRes.status !== 200) throw new Error('GET /api/pets should return 200');
    const beforePets = (beforePetsRes.body.payload || []).length;

    const genRes = await request(app)
      .post('/api/mocks/generateData')
      .send({ users: 1, pets: 1 });
    if (genRes.status !== 200) throw new Error('POST /api/mocks/generateData should return 200');
    if (!genRes.body || genRes.body.status !== 'success') throw new Error('generateData response invalid');

    const afterUsersRes = await request(app).get('/api/users');
    if (afterUsersRes.status !== 200) throw new Error('GET /api/users after should return 200');
    const afterExampleUsers = countExampleUsers(afterUsersRes.body.payload || []);

    const afterPetsRes = await request(app).get('/api/pets');
    if (afterPetsRes.status !== 200) throw new Error('GET /api/pets after should return 200');
    const afterPets = (afterPetsRes.body.payload || []).length;

    if (afterExampleUsers < beforeExampleUsers + 1) throw new Error('Users were not inserted');
    if (afterPets < beforePets + 1) throw new Error('Pets were not inserted');
  });
});
