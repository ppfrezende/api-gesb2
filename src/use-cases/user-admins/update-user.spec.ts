import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UpdateUserProfileUseCase } from './update-user';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserProfileUseCase;

describe('Update User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserProfileUseCase(usersRepository);
  });

  it('should be able to update user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      sector: 'TI',
      email: 'johndoe@tetsistemi.com',
      password_hash: await hash('123456', 6),
    });

    const { updatedUser } = await sut.execute({
      userId: createdUser.id,
      data: {
        email: 'johndoe_updated@tetsistemi.com',
      },
    });

    expect(updatedUser!.email).toEqual('johndoe_updated@tetsistemi.com');
  });

  it('should not be able to update user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
        data: {},
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
