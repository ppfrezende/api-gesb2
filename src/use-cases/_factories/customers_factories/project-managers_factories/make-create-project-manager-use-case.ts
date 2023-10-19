import { PrismaCustomerProjectManagersRepository } from '@/repositories/prisma/prisma-customers-project-managers-repository';
import { CreateProjectManagerUseCase } from '../../../customers/customer-project-managers/create-project-manager';

export function makeCreateProjectManagerUseCase() {
  const prismaProjectManagersRepository =
    new PrismaCustomerProjectManagersRepository();
  const useCase = new CreateProjectManagerUseCase(
    prismaProjectManagersRepository,
  );

  return useCase;
}
