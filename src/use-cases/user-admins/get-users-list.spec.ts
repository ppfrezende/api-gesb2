import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUsersUseCase } from './get-users-list';

let usersRepository: InMemoryUsersRepository;
let sut: GetUsersUseCase;

describe('Get Users Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUsersUseCase(usersRepository);
  });

  it('should be able to get users', async () => {
    await usersRepository.create({
      name: 'John Doe',
      sector: 'TI',
      email: 'johndoe@tetsistemi.com',
      password_hash: '123456',
    });

    await usersRepository.create({
      name: 'Fellipe Rezende',
      sector: 'TI',
      email: 'fellipe.rezendeboladao@tetsistemi.com',
      password_hash: '123456',
    });

    const { users } = await sut.execute({
      page: 1,
    });

    expect(users).toHaveLength(2);
  });
});
