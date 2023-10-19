import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { GetCustomersListUseCase } from '../../customers/get-customers-list';

export function makeGetCustomersListUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new GetCustomersListUseCase(prismaCustomersRepository);

  return useCase;
}
