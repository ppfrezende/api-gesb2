import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionBySiteUseCase } from '../../interventions/get-intervention-by-site';

export function makeGetInterventionBySiteUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionBySiteUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
