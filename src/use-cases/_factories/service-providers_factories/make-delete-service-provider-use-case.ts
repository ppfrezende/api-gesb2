import { PrismaServiceProvidersRepository } from '@/repositories/prisma/prisma-service-providers-repository';
import { DeleteServiceProviderUseCase } from '../../service-providers/delete-service-provider';

export function makeDeleteServiceProviderProfileUseCase() {
  const serviceProviderRepository = new PrismaServiceProvidersRepository();
  const useCase = new DeleteServiceProviderUseCase(serviceProviderRepository);

  return useCase;
}
