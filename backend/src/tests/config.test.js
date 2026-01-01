describe('Environment Configuration', () => {
  test('NODE_ENV should be test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  test('should have required environment variables', () => {
    const requiredVars = [
      'DATABASE_URL',
      'JWT_SECRET',
      'PORT'
    ];

    requiredVars.forEach(varName => {
      expect(process.env[varName]).toBeDefined();
      expect(process.env[varName].length).toBeGreaterThan(0);
    });
  });

  test('database URL should be for test environment', () => {
    // Ensure we're not using production database
    const dbUrl = process.env.DATABASE_URL;
    expect(dbUrl).toContain('test'); // or 'localhost'
    expect(dbUrl).not.toContain('prod');
    expect(dbUrl).not.toContain('production');
  });
});