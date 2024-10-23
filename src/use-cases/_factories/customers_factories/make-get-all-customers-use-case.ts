import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { GetAllCustomersListUseCase } from '../../customers/get-all-customers';

export function makeGetAllCustomersListUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new GetAllCustomersListUseCase(prismaCustomersRepository);

  return useCase;
}
