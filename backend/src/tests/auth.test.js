import request from 'supertest';
import app from '../server';

describe('Authentication', () => {
  test('POST /api/auth/register - should register user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'Password123!'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).not.toHaveProperty('password');
  });

  test('POST /api/auth/login - should login user', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'Password123!'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });
});