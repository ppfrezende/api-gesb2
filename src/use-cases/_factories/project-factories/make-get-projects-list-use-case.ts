import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository';
import { GetProjectsUseCase } from '../../projects/get-projects-list';

export function makeGetProjectsUseCase() {
  const prismaProjectsRepository = new PrismaProjectsRepository();
  const useCase = new GetProjectsUseCase(prismaProjectsRepository);

  return useCase;
}
