import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUsersUseCase } from './register-user';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUsersUseCase;

describe('Register User Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUsersUseCase(usersRepository);
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      sector: 'TI',
      email: 'johndoe@tetsistemi.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email', async () => {
    const email = 'johndoe@tetsistemi.com';

    await sut.execute({
      name: 'John Doe',
      sector: 'TI',
      email: email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        sector: 'TI',
        email: email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      sector: 'TI',
      email: 'johndoe@tetsistemi.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
