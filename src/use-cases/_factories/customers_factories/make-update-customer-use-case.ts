import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { UpdateCustomerUseCase } from '../../customers/update-customer';

export function makeUpdateCustomerUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new UpdateCustomerUseCase(prismaCustomersRepository);

  return useCase;
}
