import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Authenticate User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to authenticate a User', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@tetsistemi.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      refreshToken: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      sector: expect.any(String),
    });
  });
});
