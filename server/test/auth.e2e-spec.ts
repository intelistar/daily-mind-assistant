import request from 'supertest';

describe('Auth (staging)', () => {
  const api = request(process.env.STAGING_URL!);

  it('/auth/register POST', async () => {
    const dto = {
      name: 'Test User',
      email: `test_${Date.now()}@mail.com`,
      password: '11111111',
    };

    const res = await api.post('/auth/register').send(dto);

    expect(res.status).toBe(201);
  });
});
