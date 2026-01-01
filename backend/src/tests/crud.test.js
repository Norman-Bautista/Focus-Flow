import request from 'supertest';
import app from '../server';

let authToken;
let createdItemId;

describe('CRUD Operations', () => {
  beforeAll(async () => {
    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'Password123!' });
    
    authToken = loginResponse.body.token;
  });

  test('POST /api/items - should create item', async () => {
    const itemData = {
      name: 'Test Item',
      description: 'Test Description'
    };

    const response = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send(itemData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(itemData.name);
    
    createdItemId = response.body._id;
  });

  test('GET /api/items - should get all items', async () => {
    const response = await request(app)
      .get('/api/items')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('PUT /api/items/:id - should update item', async () => {
    const updateData = {
      name: 'Updated Item Name'
    };

    const response = await request(app)
      .put(`/api/items/${createdItemId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updateData.name);
  });

  test('DELETE /api/items/:id - should delete item', async () => {
    const response = await request(app)
      .delete(`/api/items/${createdItemId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});