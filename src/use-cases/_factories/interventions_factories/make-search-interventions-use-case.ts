import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { SearchInterventionsUseCase } from '../../interventions/search-interventions';

export function makeSearchInterventionsUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new SearchInterventionsUseCase(prismaInterventionsRepository);

  return useCase;
}
