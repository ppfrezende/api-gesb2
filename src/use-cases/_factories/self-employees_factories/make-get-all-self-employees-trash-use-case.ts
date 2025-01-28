import { PrismaSelfEmployeesRepository } from '@/repositories/prisma/prisma-self-employees-repository';
import { GetSelfEmployeesTrashUseCase } from '../../self-employees/get-all-self-employees-trash';

export function makeGetSelfEmployeesTrashUseCase() {
  const prismaSelfEmployeesRepository = new PrismaSelfEmployeesRepository();
  const useCase = new GetSelfEmployeesTrashUseCase(
    prismaSelfEmployeesRepository,
  );

  return useCase;
}
