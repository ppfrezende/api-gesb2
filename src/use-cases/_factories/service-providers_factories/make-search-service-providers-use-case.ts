import { PrismaServiceProvidersRepository } from '@/repositories/prisma/prisma-service-providers-repository';
import { SearchServiceProvidersUseCase } from '../../service-providers/search-service-providers';

export function makeSearchServiceProviderUseCase() {
  const prismaServiceProvidersRepository =
    new PrismaServiceProvidersRepository();
  const useCase = new SearchServiceProvidersUseCase(
    prismaServiceProvidersRepository,
  );

  return useCase;
}
