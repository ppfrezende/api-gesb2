import { PrismaServiceProvidersRepository } from '@/repositories/prisma/prisma-service-providers-repository';
import { UpdateServiceProviderProfileUseCase } from '../../service-providers/update-service-provider';

export function makeUpdateServiceProviderProfileUseCase() {
  const serviceProviderRepository = new PrismaServiceProvidersRepository();
  const useCase = new UpdateServiceProviderProfileUseCase(
    serviceProviderRepository,
  );

  return useCase;
}
