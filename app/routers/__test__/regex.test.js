const request = require('supertest');
const app = require('../..');

describe('Access Control Tests', () => {
  let userSession = null;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/log/in')
      .send({
        email: 'janesmith@example.com',
        password: '0000',
      });

    expect(response.statusCode).toBe(200);

    // Enregistrez le cookie de session à utiliser dans les tests ultérieurs
    userSession = response.headers['set-cookie'];
  });

  test('Access to /api/users/2 should return 200', async () => {
    const response = await request(app)
      .get('/api/users/2')
      .set('Cookie', userSession);

    expect(response.statusCode).toBe(200);
  });

  test('Access to /api/users/securityTest should return 400', async () => {
    const response = await request(app)
      .get('/api/users/securityTest')
      .set('Cookie', userSession);

    expect(response.statusCode).toBe(400);
  });

  test('Access to /api/users/2/plots/securityTest should return 400', async () => {
    const response = await request(app)
      .get('/api/users/2/plots/5<script>')
      .set('Cookie', userSession);

    expect(response.statusCode).toBe(400);
  });
});
