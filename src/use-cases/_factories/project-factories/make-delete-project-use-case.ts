import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository';
import { DeleteProjectUseCase } from '../../projects/delete-project';

export function makeDeleteProjectUseCase() {
  const prismaProjectsRepository = new PrismaProjectsRepository();
  const useCase = new DeleteProjectUseCase(prismaProjectsRepository);

  return useCase;
}
