import { petsService, usersService } from '../services/index.js';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { createHash } from '../utils/index.js';

const mockingPets = async (req, res) => {
  const count = parseInt(req.query.count || '100', 10);
  const pets = generateMockPets(count);
  res.send({ status: 'success', payload: pets });
};

const mockingUsers = async (req, res) => {
  const count = parseInt(req.query.count || '50', 10);
  const users = await generateMockUsers(count, createHash);
  res.send({ status: 'success', payload: users });
};

const generateData = async (req, res) => {
  const { users = 0, pets = 0 } = req.body || {};
  const uCount = parseInt(users, 10) || 0;
  const pCount = parseInt(pets, 10) || 0;

  const mockUsers = await generateMockUsers(uCount, createHash);
  const mockPets = generateMockPets(pCount);

  let createdUsers = [];
  let createdPets = [];

  if (mockUsers.length) {
    createdUsers = await Promise.all(mockUsers.map((u) => usersService.create(u)));
  }
  if (mockPets.length) {
    createdPets = await Promise.all(mockPets.map((p) => petsService.create(p)));
  }

  res.send({ status: 'success', payload: { users: createdUsers.length, pets: createdPets.length } });
};

export default { mockingPets, mockingUsers, generateData };
