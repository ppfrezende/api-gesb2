import { PrismaCustomerProjectManagersRepository } from '@/repositories/prisma/prisma-customers-project-managers-repository';
import { GetProjectManagersListByCustomerIdUseCase } from '../../../customers/customer-project-managers/get-project-manager-by-customer-id';

export function makeGetProjectManagersListByCustomerIdUseCase() {
  const prismaProjectManagersRepository =
    new PrismaCustomerProjectManagersRepository();
  const useCase = new GetProjectManagersListByCustomerIdUseCase(
    prismaProjectManagersRepository,
  );

  return useCase;
}
