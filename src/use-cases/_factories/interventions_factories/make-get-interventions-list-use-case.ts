import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionsListUseCase } from '../../interventions/get-interventions-list';

export function makeGetInterventionsListUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionsListUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
