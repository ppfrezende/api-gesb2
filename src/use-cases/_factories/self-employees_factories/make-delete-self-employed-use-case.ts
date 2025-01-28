import { PrismaSelfEmployeesRepository } from '@/repositories/prisma/prisma-self-employees-repository';
import { DeleteSelfEmployedUseCase } from '../../self-employees/delete-self-employed';

export function makeDeleteSelfEmployedUseCase() {
  const prismaSelfEmployeesRepository = new PrismaSelfEmployeesRepository();
  const useCase = new DeleteSelfEmployedUseCase(prismaSelfEmployeesRepository);

  return useCase;
}
