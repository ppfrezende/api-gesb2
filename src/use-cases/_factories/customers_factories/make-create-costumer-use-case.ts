import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { CreateCustomerUseCase } from '../../customers/create-customer';

export function makeCreateCustomerUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new CreateCustomerUseCase(prismaCustomersRepository);

  return useCase;
}
