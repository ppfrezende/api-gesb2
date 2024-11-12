import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetMonthlyInterventionsCountUseCase } from '../../interventions/get-monthly-interventions-count';

export function makeGetMonthlyInterventionsCountUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetMonthlyInterventionsCountUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
