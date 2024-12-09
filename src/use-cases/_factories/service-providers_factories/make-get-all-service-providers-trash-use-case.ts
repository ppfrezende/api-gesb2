import { PrismaServiceProvidersRepository } from '@/repositories/prisma/prisma-service-providers-repository';
import { GetServiceProvidersTrashUseCase } from '../../service-providers/get-all-service-providers-trash';

export function makeGetServiceProvidersTrashUseCase() {
  const serviceProvidersRepository = new PrismaServiceProvidersRepository();
  const useCase = new GetServiceProvidersTrashUseCase(
    serviceProvidersRepository,
  );

  return useCase;
}
