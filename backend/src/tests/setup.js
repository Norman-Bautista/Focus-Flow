import { connect, connection, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

// Use in-memory MongoDB for tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear all collections before each test
beforeEach(async () => {
  const collections = connection.collections;
  
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await disconnect();
  await mongoServer.stop();
});