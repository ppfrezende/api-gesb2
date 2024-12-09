import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetAllUsersTrashUseCase } from '../../user-admins/get-all-users-trash';

export function makeGetAllUsersTrashUseCaseRepository() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetAllUsersTrashUseCase(usersRepository);

  return useCase;
}
