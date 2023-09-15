import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository';
import { GetProjectUseCase } from '../../projects/get-project';

export function makeGetProjectUseCase() {
  const prismaProjectsRepository = new PrismaProjectsRepository();
  const useCase = new GetProjectUseCase(prismaProjectsRepository);

  return useCase;
}
