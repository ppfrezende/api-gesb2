import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Update a User Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to update a User a profile', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const userResponse = await request(app.server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fellipe Rezende',
        sector: 'TI',
        email: 'fellipe.rezende@tetsistemi.com',
        password: '123456',
      });

    const response = await request(app.server)
      .put(`/users/${userResponse.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'BOMBAPATCHATUALIZADO@tetsistemi.com',
        sector: 'DEV',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.user.email).toEqual(
      'BOMBAPATCHATUALIZADO@tetsistemi.com',
    );
    expect(response.body.user.sector).toEqual('DEV');
  });
});
