import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetAllInterventionsTrashListUseCase } from '../../interventions/get-all-interventions-trash';

export function makeGetAllInterventionsTrashListUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetAllInterventionsTrashListUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
