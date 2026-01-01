import request from 'supertest';
import app from '../server'; // your Express app

describe('Basic API Routes', () => {
  test('GET /api/health - should return health status', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('healthy');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('GET /api - should return API info', async () => {
    const response = await request(app).get('/api');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('API');
  });

  test('GET /non-existent-route - should return 404', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.statusCode).toBe(404);
  });
});