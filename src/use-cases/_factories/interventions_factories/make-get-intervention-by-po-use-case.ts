import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionByPOUseCase } from '../../interventions/get-intervention-by-po';

export function makeGetInterventionByPOUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionByPOUseCase(prismaInterventionsRepository);

  return useCase;
}
