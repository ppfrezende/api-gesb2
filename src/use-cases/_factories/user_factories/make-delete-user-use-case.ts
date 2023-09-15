import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { DeleteUserUseCase } from '../../user-admins/delete-user';

export function makeDeleteUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new DeleteUserUseCase(usersRepository);

  return useCase;
}
