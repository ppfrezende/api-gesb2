import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository';
import { UpdateProjectUseCase } from '../../projects/update-project';

export function makeUpdateProjectUseCase() {
  const prismaProjectsRepository = new PrismaProjectsRepository();
  const useCase = new UpdateProjectUseCase(prismaProjectsRepository);

  return useCase;
}
