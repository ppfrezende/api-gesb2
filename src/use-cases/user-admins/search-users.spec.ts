import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { SearchUsersUseCase } from './search-users';

let usersRepository: InMemoryUsersRepository;
let sut: SearchUsersUseCase;

describe('Search User Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new SearchUsersUseCase(usersRepository);
  });

  it('should be able to search user', async () => {
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
      query: 'John',
      page: 1,
    });

    expect(users).toHaveLength(1),
      expect(users).toEqual([expect.objectContaining({ name: 'John Doe' })]);
  });

  it('should be able to fetch paginated users search', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        name: `John Doe ${i}`,
        sector: 'TI',
        email: `johndoe${i}@tetsistemi.com`,
        password_hash: '123456',
      });
      1;
    }

    const { users } = await sut.execute({
      query: 'John',
      page: 2,
    });

    expect(users).toHaveLength(2),
      expect(users).toEqual([
        expect.objectContaining({ name: 'John Doe 21' }),
        expect.objectContaining({ name: 'John Doe 22' }),
      ]);
  });
});
