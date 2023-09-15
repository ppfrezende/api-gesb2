import { PrismaServiceProvidersRepository } from '@/repositories/prisma/prisma-service-providers-repository';
import { GetServiceProviderProfileUseCase } from '../../service-providers/get-service-provider';

export function makeGetServiceProviderProfileUseCase() {
  const serviceProvidersRepository = new PrismaServiceProvidersRepository();
  const useCase = new GetServiceProviderProfileUseCase(
    serviceProvidersRepository,
  );

  return useCase;
}
