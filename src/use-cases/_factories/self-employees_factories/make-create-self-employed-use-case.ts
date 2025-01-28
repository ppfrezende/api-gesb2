import { PrismaSelfEmployeesRepository } from '@/repositories/prisma/prisma-self-employees-repository';
import { CreateSelfEmployedUseCase } from '../../self-employees/create-self-employed';

export function makeCreateSelfEmployedUseCase() {
  const prismaSelfEmployeesRepository = new PrismaSelfEmployeesRepository();
  const useCase = new CreateSelfEmployedUseCase(prismaSelfEmployeesRepository);

  return useCase;
}
