import { fakerES as faker } from '@faker-js/faker';

export const generateMockPets = (count = 100) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      name: faker.animal.petName(),
      specie: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'hamster', 'fish']),
      birthDate: faker.date.birthdate({ min: 1, max: 15, mode: 'age' }),
      adopted: false,
      image: ''
    });
  }
  return items;
};

export const generateMockUsers = async (count = 50, hashFn) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
  const base = faker.internet.username({ firstName: first_name, lastName: last_name }).toLowerCase();
  const email = `${base}.${i}.${Date.now()}@example.com`;
    const role = faker.helpers.arrayElement(['user', 'admin']);
    const password = await hashFn('coder123');
    items.push({ first_name, last_name, email, password, role, pets: [] });
  }
  return items;
};
