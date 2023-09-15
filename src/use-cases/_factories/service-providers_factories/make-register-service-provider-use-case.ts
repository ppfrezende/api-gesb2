import { PrismaServiceProvidersRepository } from '@/repositories/prisma/prisma-service-providers-repository';
import { RegisterServiceProviderUseCase } from '../../service-providers/register-service-provider';

export function makeRegisterServiceProviderUseCase() {
  const prismaEmployeesRepository = new PrismaServiceProvidersRepository();
  const useCase = new RegisterServiceProviderUseCase(prismaEmployeesRepository);

  return useCase;
}
