import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository';
import { SearchProjectsUseCase } from '../../projects/search-projects';

export function makeSearchProjectsUseCase() {
  const prismaProjectsRepository = new PrismaProjectsRepository();
  const useCase = new SearchProjectsUseCase(prismaProjectsRepository);

  return useCase;
}
