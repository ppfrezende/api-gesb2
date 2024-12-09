import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { GetAllCustomersTrashListUseCase } from '../../customers/get-all-customers-trash';

export function makeGetAllCustomersTrashListUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new GetAllCustomersTrashListUseCase(
    prismaCustomersRepository,
  );

  return useCase;
}
