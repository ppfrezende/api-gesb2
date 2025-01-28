import { PrismaSelfEmployeesRepository } from '@/repositories/prisma/prisma-self-employees-repository';
import { UpdateSelfEmployedProfileUseCase } from '../../self-employees/update-self-employed';

export function makeUpdateSelfEmployedProfileUseCase() {
  const prismaSelfEmployeesRepository = new PrismaSelfEmployeesRepository();
  const useCase = new UpdateSelfEmployedProfileUseCase(
    prismaSelfEmployeesRepository,
  );

  return useCase;
}
