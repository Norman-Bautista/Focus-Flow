import request from 'supertest';
import app from '../server';

describe('Error Handling', () => {
  test('should handle invalid JSON', async () => {
    const response = await request(app)
      .post('/api/items')
      .set('Content-Type', 'application/json')
      .send('invalid json string');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('should handle unauthorized access', async () => {
    const response = await request(app)
      .get('/api/protected-route')
      // No auth token

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test('should handle validation errors', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: '123' // too short
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});