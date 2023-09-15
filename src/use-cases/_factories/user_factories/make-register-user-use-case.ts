import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUsersUseCase } from '../../user-admins/register-user';

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUserUseCase = new RegisterUsersUseCase(usersRepository);

  return registerUserUseCase;
}
