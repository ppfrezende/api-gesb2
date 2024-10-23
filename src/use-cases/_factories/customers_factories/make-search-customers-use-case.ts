import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';
import { SearchCustomersUseCase } from '../../customers/search-customer';

export function makeSearchCustomersUseCase() {
  const prismaCustomersRepository = new PrismaCustomersRepository();
  const useCase = new SearchCustomersUseCase(prismaCustomersRepository);

  return useCase;
}
