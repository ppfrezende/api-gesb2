import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository';
import { CreateProjectUseCase } from '../../projects/create-project';

export function makeCreateProjectUseCase() {
  const prismaProjectsRepository = new PrismaProjectsRepository();
  const useCase = new CreateProjectUseCase(prismaProjectsRepository);

  return useCase;
}
