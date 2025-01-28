import { PrismaSelfEmployeesRepository } from '@/repositories/prisma/prisma-self-employees-repository';
import { SearchSelfEmployeesUseCase } from '../../self-employees/search-self-employees';

export function makeSearchSelfEmployeesUseCase() {
  const prismaSelfEmployeesRepository = new PrismaSelfEmployeesRepository();
  const useCase = new SearchSelfEmployeesUseCase(prismaSelfEmployeesRepository);

  return useCase;
}
