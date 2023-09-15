import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { SearchIntersventionUseCase } from '../../interventions/search-interventions';

export function makeSearchIntersventionUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new SearchIntersventionUseCase(prismaInterventionsRepository);

  return useCase;
}
