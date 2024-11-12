import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetAnualInterventionsProfitTotalValueUseCase } from '../../interventions/get-anual-interventions-profit';

export function makeGetAnualInterventionsProfitTotalValueUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetAnualInterventionsProfitTotalValueUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
