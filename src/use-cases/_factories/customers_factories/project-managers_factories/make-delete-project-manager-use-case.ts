import { PrismaCustomerProjectManagersRepository } from '@/repositories/prisma/prisma-customers-project-managers-repository';
import { DeleteProjectManagerUseCase } from '../../../customers/customer-project-managers/delete-project-manager';

export function makeDeleteProjectManagerUseCase() {
  const prismaProjectManagersRepository =
    new PrismaCustomerProjectManagersRepository();
  const useCase = new DeleteProjectManagerUseCase(
    prismaProjectManagersRepository,
  );

  return useCase;
}
