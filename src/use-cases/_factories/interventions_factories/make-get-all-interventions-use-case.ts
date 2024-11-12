import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetAllInterventionsListUseCase } from '../../interventions/get-all-interventions';

export function makeGetAllInterventionsListUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetAllInterventionsListUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
