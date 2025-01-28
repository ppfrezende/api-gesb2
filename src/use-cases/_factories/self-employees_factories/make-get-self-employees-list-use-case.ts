import { PrismaSelfEmployeesRepository } from '@/repositories/prisma/prisma-self-employees-repository';
import { GetSelfEmployeesListUseCase } from '../../self-employees/get-self-employees-list';

export function makeGetSelfEmployeesListUseCase() {
  const prismaSelfEmployeesRepository = new PrismaSelfEmployeesRepository();
  const useCase = new GetSelfEmployeesListUseCase(
    prismaSelfEmployeesRepository,
  );

  return useCase;
}
