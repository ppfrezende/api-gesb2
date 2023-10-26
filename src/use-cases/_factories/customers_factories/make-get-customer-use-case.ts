import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { GetCustomerUseCase } from '../../customers/get-customer';

export function makeGetCustomerUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new GetCustomerUseCase(prismaCustomersRepository);

  return useCase;
}
