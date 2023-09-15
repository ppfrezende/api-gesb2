import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUsersUseCase } from '../../user-admins/get-users-list';

export function makeGetUsersRepository() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUsersUseCase(usersRepository);

  return useCase;
}
