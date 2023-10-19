import { PrismaConsultivesRepository } from '@/repositories/prisma/prisma-consultives-repository';
import { DeleteConsultiveUseCase } from '../../consultives/delete-consultive';

export function makeDeleteConsultiveUseCase() {
  const prismaConsultivesRepository = new PrismaConsultivesRepository();
  const useCase = new DeleteConsultiveUseCase(prismaConsultivesRepository);

  return useCase;
}
