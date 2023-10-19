import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { DeleteCustomerUseCase } from '../../customers/delete-customer';

export function makeDeleteCustomerUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new DeleteCustomerUseCase(prismaCustomersRepository);

  return useCase;
}
