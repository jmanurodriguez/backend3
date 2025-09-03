import request from 'supertest';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import { config } from '../config/environment.js';

chai.use(chaiHttp);
chai.should();

const MONGO_URL = config.mongoUrl;

const pickFirstId = (arr) => (arr && arr[0] && arr[0]._id) || (arr && arr[0] && arr[0].id);

describe('Adoptions Router - Functional Tests', () => {
  before(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/adoptions', () => {
    it('should return all adoptions with status 200', async () => {
      const response = await request(app).get('/api/adoptions');
      
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('status').eql('success');
      response.body.should.have.property('payload');
      response.body.payload.should.be.a('array');
    });

    it('should return adoption list in correct format', async () => {
      await request(app).post('/api/mocks/generateData').send({ users: 2, pets: 2 });
      
      const usersRes = await request(app).get('/api/users');
      const petsRes = await request(app).get('/api/pets');
      const userId = pickFirstId(usersRes.body.payload);
      const availablePet = (petsRes.body.payload || []).find(p => !p.adopted);
      const petId = availablePet ? (availablePet._id || availablePet.id) : pickFirstId(petsRes.body.payload);
      
      await request(app).post(`/api/adoptions/${userId}/${petId}`);
      
      const response = await request(app).get('/api/adoptions');
      
      if (response.body.payload.length > 0) {
        const adoption = response.body.payload[0];
        adoption.should.have.property('owner');
        adoption.should.have.property('pet');
        adoption.should.have.property('_id');
      }
    });
  });

  describe('GET /api/adoptions/:aid', () => {
    it('should return specific adoption by ID with status 200', async () => {
      await request(app).post('/api/mocks/generateData').send({ users: 1, pets: 1 });
      
      const usersRes = await request(app).get('/api/users');
      const petsRes = await request(app).get('/api/pets');
      const userId = pickFirstId(usersRes.body.payload);
      const availablePet = (petsRes.body.payload || []).find(p => !p.adopted);
      const petId = availablePet ? (availablePet._id || availablePet.id) : pickFirstId(petsRes.body.payload);
      
      await request(app).post(`/api/adoptions/${userId}/${petId}`);
      
      const adoptionsRes = await request(app).get('/api/adoptions');
      const adoptionId = pickFirstId(adoptionsRes.body.payload);
      
      const response = await request(app).get(`/api/adoptions/${adoptionId}`);
      
      response.should.have.status(200);
      response.body.should.have.property('status').eql('success');
      response.body.should.have.property('payload');
      response.body.payload.should.have.property('_id').eql(adoptionId.toString());
    });

    it('should return 404 for non-existing adoption ID', async () => {
      const fakeAdoptionId = new mongoose.Types.ObjectId().toString();
      
      const response = await request(app).get(`/api/adoptions/${fakeAdoptionId}`);
      
      response.should.have.status(404);
      response.body.should.have.property('status').eql('error');
      response.body.should.have.property('error').eql('Adoption not found');
    });
  });

  describe('POST /api/adoptions/:uid/:pid', () => {
    it('should create adoption successfully with valid user and pet', async () => {
      const preAdoptionsRes = await request(app).get('/api/adoptions');
      const preCount = (preAdoptionsRes.body.payload || []).length;

      await request(app).post('/api/mocks/generateData').send({ users: 1, pets: 1 });

      const usersRes = await request(app).get('/api/users');
      const petsRes = await request(app).get('/api/pets');
      const userId = pickFirstId(usersRes.body.payload);
      const availablePet = (petsRes.body.payload || []).find(p => !p.adopted);
      const petId = availablePet ? (availablePet._id || availablePet.id) : pickFirstId(petsRes.body.payload);

      const response = await request(app).post(`/api/adoptions/${userId}/${petId}`);

      response.should.have.status(200);
      response.body.should.have.property('status').eql('success');
      response.body.should.have.property('message').eql('Pet adopted');

      const postAdoptionsRes = await request(app).get('/api/adoptions');
      const postList = postAdoptionsRes.body.payload || [];
      postList.should.have.lengthOf.at.least(preCount + 1);

      const petCheckRes = await request(app).get('/api/pets');
      const adoptedPet = (petCheckRes.body.payload || []).find(p => (p._id || p.id) === petId);
      adoptedPet.should.have.property('adopted').eql(true);
      adoptedPet.should.have.property('owner').eql(userId.toString());
    });

    it('should return 404 when user does not exist', async () => {
      const fakeUserId = new mongoose.Types.ObjectId().toString();
      const petsRes = await request(app).get('/api/pets');
      const petId = pickFirstId(petsRes.body.payload);
      
      const response = await request(app).post(`/api/adoptions/${fakeUserId}/${petId}`);
      
      response.should.have.status(404);
      response.body.should.have.property('status').eql('error');
      response.body.should.have.property('error').eql('user Not found');
    });

    it('should return 404 when pet does not exist', async () => {
      const usersRes = await request(app).get('/api/users');
      const userId = pickFirstId(usersRes.body.payload);
      const fakePetId = new mongoose.Types.ObjectId().toString();
      
      const response = await request(app).post(`/api/adoptions/${userId}/${fakePetId}`);
      
      response.should.have.status(404);
      response.body.should.have.property('status').eql('error');
      response.body.should.have.property('error').eql('Pet not found');
    });

    it('should return 400 when pet is already adopted', async () => {
      const usersRes = await request(app).get('/api/users');
      const petsRes = await request(app).get('/api/pets');
      const userId = pickFirstId(usersRes.body.payload);
      const adoptedPet = (petsRes.body.payload || []).find(p => p.adopted);
      
      if (adoptedPet) {
        const petId = adoptedPet._id || adoptedPet.id;
        const response = await request(app).post(`/api/adoptions/${userId}/${petId}`);
        
        response.should.have.status(400);
        response.body.should.have.property('status').eql('error');
        response.body.should.have.property('error').eql('Pet is already adopted');
      }
    });

    it('should update user pets array after successful adoption', async () => {
      await request(app).post('/api/mocks/generateData').send({ users: 1, pets: 1 });
      
      const usersRes = await request(app).get('/api/users');
      const petsRes = await request(app).get('/api/pets');
      const userId = pickFirstId(usersRes.body.payload);
      const availablePet = (petsRes.body.payload || []).find(p => !p.adopted);
      const petId = availablePet ? (availablePet._id || availablePet.id) : pickFirstId(petsRes.body.payload);
      
      const preUserRes = await request(app).get(`/api/users/${userId}`);
      const prePetsCount = (preUserRes.body.payload.pets || []).length;
      
      await request(app).post(`/api/adoptions/${userId}/${petId}`);
      
      const postUserRes = await request(app).get(`/api/users/${userId}`);
      const postPetsCount = (postUserRes.body.payload.pets || []).length;
      
      postPetsCount.should.be.greaterThan(prePetsCount);
      
      const userPets = postUserRes.body.payload.pets || [];
      const adoptedPetInUser = userPets.find(pet => (pet._id || pet.id || pet) == petId);
      adoptedPetInUser.should.not.be.undefined;
    });
  });

  describe('Integration Tests', () => {
    it('should handle multiple adoptions workflow', async () => {
      await request(app).post('/api/mocks/generateData').send({ users: 3, pets: 3 });
      
      const usersRes = await request(app).get('/api/users');
      const petsRes = await request(app).get('/api/pets');
      
      const users = usersRes.body.payload || [];
      const availablePets = (petsRes.body.payload || []).filter(p => !p.adopted);
      
      if (users.length >= 2 && availablePets.length >= 2) {
        const user1Id = users[0]._id || users[0].id;
        const user2Id = users[1]._id || users[1].id;
        const pet1Id = availablePets[0]._id || availablePets[0].id;
        const pet2Id = availablePets[1]._id || availablePets[1].id;
        
        const adoption1 = await request(app).post(`/api/adoptions/${user1Id}/${pet1Id}`);
        adoption1.should.have.status(200);
        
        const adoption2 = await request(app).post(`/api/adoptions/${user2Id}/${pet2Id}`);
        adoption2.should.have.status(200);
        
        const adoptionsRes = await request(app).get('/api/adoptions');
        const adoptions = adoptionsRes.body.payload || [];
        
        const user1Adoption = adoptions.find(a => String(a.owner) === String(user1Id));
        const user2Adoption = adoptions.find(a => String(a.owner) === String(user2Id));
        
        user1Adoption.should.not.be.undefined;
        user2Adoption.should.not.be.undefined;
      }
    });
  });
});
