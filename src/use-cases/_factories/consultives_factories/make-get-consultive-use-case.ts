import { PrismaConsultivesRepository } from '@/repositories/prisma/prisma-consultives-repository';
import { GetConsultiveUseCase } from '../../consultives/get-consultive';

export function makeGetConsultiveUseCase() {
  const prismaConsultivesRepository = new PrismaConsultivesRepository();
  const useCase = new GetConsultiveUseCase(prismaConsultivesRepository);

  return useCase;
}
