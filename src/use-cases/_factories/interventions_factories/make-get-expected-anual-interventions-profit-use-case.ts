import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetAnualInterventionsProfitExpectedValueUseCase } from '../../interventions/get-expected-anual-interventions-profit';

export function makeGetAnualInterventionsProfitExpectedValueUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetAnualInterventionsProfitExpectedValueUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
