import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { Role, User } from '@prisma/client';
import { UserAlreadyExistsError } from '../errors/user-already-exists';

interface RegisterUsersUseCaseRequest {
  name: string;
  sector: string;
  email: string;
  password: string;
  role?: Role;
}

interface RegisterUsersUseCaseResponse {
  user: User;
}

export class RegisterUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    sector,
    email,
    password,
    role,
  }: RegisterUsersUseCaseRequest): Promise<RegisterUsersUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      sector,
      email,
      password_hash,
      role,
    });

    return {
      user,
    };
  }
}
