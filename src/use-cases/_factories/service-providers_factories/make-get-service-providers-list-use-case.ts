import { PrismaServiceProvidersRepository } from '@/repositories/prisma/prisma-service-providers-repository';
import { GetServiceProvidersUseCase } from '../../service-providers/get-service-providers-list';

export function makeGetServiceProvidersListUseCase() {
  const serviceProvidersRepository = new PrismaServiceProvidersRepository();
  const useCase = new GetServiceProvidersUseCase(serviceProvidersRepository);

  return useCase;
}
