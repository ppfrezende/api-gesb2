import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Get Users (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to get a Users', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fellipe Silva',
        sector: 'TI',
        email: 'fellipe.silva@tetsistemi.com',
        password: '123456',
      });

    await request(app.server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fellipe Rezende',
        sector: 'TI',
        email: 'fellipe.rezende@tetsistemi.com',
        password: '123456',
      });

    const response = await request(app.server)
      .get('/users')

      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
