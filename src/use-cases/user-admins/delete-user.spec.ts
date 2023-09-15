import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { DeleteUserUseCase } from './delete-user';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete user profile', async () => {
    await usersRepository.create({
      name: 'John Doe',
      sector: 'TI',
      email: 'johndoe@tetsistemi.com',
      password_hash: await hash('123456', 6),
    });

    const createdUser2 = await usersRepository.create({
      name: 'Fellipe Silva',
      sector: 'TI',
      email: 'fellipe.silva@tetsistemi.com',
      password_hash: await hash('123456', 6),
    });

    await sut.execute({
      userId: createdUser2.id,
    });

    const users = await usersRepository.listMany(1);

    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('johndoe@tetsistemi.com');
  });

  it('should not be able to delete user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
