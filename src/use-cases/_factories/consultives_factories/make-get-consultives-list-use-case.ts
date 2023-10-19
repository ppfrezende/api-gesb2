import { PrismaConsultivesRepository } from '@/repositories/prisma/prisma-consultives-repository';
import { GetConsultivesListUseCase } from '../../consultives/get-consultives-list';

export function makeGetConsultivesListUseCase() {
  const prismaConsultivesRepository = new PrismaConsultivesRepository();
  const useCase = new GetConsultivesListUseCase(prismaConsultivesRepository);

  return useCase;
}
