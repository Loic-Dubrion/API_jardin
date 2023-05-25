const request = require('supertest');
const app = require('../..');

describe('Access Control Tests', () => {
  let userSession = null;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/log/in')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      });

    expect(response.statusCode).toBe(200);

    // Save the session cookie for use in future tests
    userSession = response.headers['set-cookie'];
  });

  test('Access to /api/plants/ should return 200', async () => {
    const response = await request(app)
      .get('/api/plants')
      .set('Cookie', userSession);

    expect(response.statusCode).toBe(200);
  });

  test('Access to /api/plants/families should return 200', async () => {
    const response = await request(app)
      .get('/api/plants/families')
      .set('Cookie', userSession);

    expect(response.statusCode).toBe(200);
  });

  test('Access to /api/plants/categories should return 200', async () => {
    const response = await request(app)
      .get('/api/plants/categories')
      .set('Cookie', userSession);

    expect(response.statusCode).toBe(200);
  });

  test('Access to /api/plants/{plantId} should return 200', async () => {
    const plantId = 1;
    const response = await request(app)
      .get(`/api/plants/${plantId}`)
      .set('Cookie', userSession);

    expect(response.statusCode).toBe(200);
  });

  test('Creating a new plant should return 201', async () => {
    const plantData = {
      name: 'New PlantTest',
      specification: [],
      culture_advice: [],
      id_family: 1,
      id_category: 1,
    };

    const response = await request(app)
      .post('/api/plants')
      .set('Cookie', userSession)
      .send(plantData);

    expect(response.statusCode).toBe(201);
  });

  test('Updating a plant should return 200', async () => {
    const plantId = 1;
    const updatedPlantData = {
      name: 'Updated Plant',
      specification: [],
      culture_advice: [],
      id_family: 1,
      id_category: 1,
    };

    const response = await request(app)
      .put(`/api/plants/${plantId}`)
      .set('Cookie', userSession)
      .send(updatedPlantData);

    expect(response.statusCode).toBe(200);
  });
});
