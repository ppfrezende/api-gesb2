import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UpdateUserProfileUseCase } from '../../user-admins/update-user';

export function makeUpdateUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new UpdateUserProfileUseCase(usersRepository);

  return useCase;
}
