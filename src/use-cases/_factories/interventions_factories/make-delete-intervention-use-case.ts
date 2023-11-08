import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { DeleteInterventionUseCase } from '../../interventions/delete-intervention';

export function makeDeleteInterventionUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new DeleteInterventionUseCase(prismaInterventionsRepository);

  return useCase;
}
