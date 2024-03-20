import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionByTechUseCase } from '../../interventions/get-intervention-by-tech';

export function makeGetInterventionByTechUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionByTechUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
