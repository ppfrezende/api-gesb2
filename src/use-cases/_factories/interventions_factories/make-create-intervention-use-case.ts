import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { CreateInterventionUseCase } from '../../interventions/create-intervention';

export function makeCreateInterventionUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new CreateInterventionUseCase(prismaInterventionsRepository);

  return useCase;
}
