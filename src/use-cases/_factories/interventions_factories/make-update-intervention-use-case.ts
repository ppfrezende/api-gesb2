import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { UpdateInterventionUseCase } from '../../interventions/update-intervention';

export function makeUpdateInterventionUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new UpdateInterventionUseCase(prismaInterventionsRepository);

  return useCase;
}
