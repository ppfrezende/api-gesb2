import { PrismaSkillsRepository } from '@/repositories/prisma/prisma-skills-repository';
import { GetSkillsByPOUseCase } from '../../skills/get-skills-by-po';

export function makeGetSkillsByPOUseCase() {
  const prismaSkillsRepository = new PrismaSkillsRepository();
  const useCase = new GetSkillsByPOUseCase(prismaSkillsRepository);

  return useCase;
}
