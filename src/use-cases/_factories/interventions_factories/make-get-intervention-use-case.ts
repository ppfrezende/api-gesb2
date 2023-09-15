import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionUseCase } from '../../interventions/get-intervention';

export function makeGetInterventionUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionUseCase(prismaInterventionsRepository);

  return useCase;
}
