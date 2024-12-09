import { PrismaCustomerProjectManagersRepository } from '@/repositories/prisma/prisma-customers-project-managers-repository';
import { GetAllCustomerProjectManagersTrashListUseCase } from '../../../customers/customer-project-managers/get-all-customers-project-managers-trash';

export function makeGetAllCustomerProjectManagersTrashListUseCase() {
  const prismaProjectManagersRepository =
    new PrismaCustomerProjectManagersRepository();
  const useCase = new GetAllCustomerProjectManagersTrashListUseCase(
    prismaProjectManagersRepository,
  );

  return useCase;
}
