import { PrismaConsultivesRepository } from '@/repositories/prisma/prisma-consultives-repository';
import { CreateConsultiveUseCase } from '../../consultives/create-consultive';

export function makeCreateConsultiveUseCase() {
  const prismaConsultivesRepository = new PrismaConsultivesRepository();
  const useCase = new CreateConsultiveUseCase(prismaConsultivesRepository);

  return useCase;
}
