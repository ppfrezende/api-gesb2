import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { SearchUsersUseCase } from '../../user-admins/search-users';

export function makeSearchUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new SearchUsersUseCase(usersRepository);

  return useCase;
}
