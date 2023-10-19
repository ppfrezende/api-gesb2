import { PrismaConsultivesRepository } from '@/repositories/prisma/prisma-consultives-repository';
import { UpdateConsultiveUseCase } from '../../consultives/update-consultive';

export function makeUpdateConsultiveUseCase() {
  const prismaConsultivesRepository = new PrismaConsultivesRepository();
  const useCase = new UpdateConsultiveUseCase(prismaConsultivesRepository);

  return useCase;
}
