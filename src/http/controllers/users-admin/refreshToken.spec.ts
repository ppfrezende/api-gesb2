import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to refresh a token', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        sector: 'TI',
        email: 'johndoe@tetsistemi.com',
        password: '123456',
      });

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@tetsistemi.com',
      password: '123456',
    });

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
