import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetMonthlyInterventionsProfitTotalValueUseCase } from '../../interventions/get-monthly-interventions-profit';

export function makeGetMonthlyInterventionsProfitTotalValueUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetMonthlyInterventionsProfitTotalValueUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
