import { PrismaCustomerProjectManagersRepository } from '@/repositories/prisma/prisma-customers-project-managers-repository';
import { UpdateProjectManagerUseCase } from '../../../customers/customer-project-managers/update-project-manager';

export function makeUpdateProjectManagerUseCase() {
  const prismaProjectManagersRepository =
    new PrismaCustomerProjectManagersRepository();
  const useCase = new UpdateProjectManagerUseCase(
    prismaProjectManagersRepository,
  );

  return useCase;
}
