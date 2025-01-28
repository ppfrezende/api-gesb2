import { PrismaSelfEmployeesRepository } from '@/repositories/prisma/prisma-self-employees-repository';
import { GetSelfEmployedProfileUseCase } from '../../self-employees/get-self-employed';

export function makeGetSelfEmployedProfileUseCase() {
  const prismaSelfEmployeesRepository = new PrismaSelfEmployeesRepository();
  const useCase = new GetSelfEmployedProfileUseCase(
    prismaSelfEmployeesRepository,
  );

  return useCase;
}
