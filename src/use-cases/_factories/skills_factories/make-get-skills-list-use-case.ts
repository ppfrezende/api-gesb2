import { PrismaSkillsRepository } from '@/repositories/prisma/prisma-skills-repository';
import { GetSkillsListUseCase } from '../../skills/get-skills-list';

export function makeGetSkillsListUseCase() {
  const prismaSkillsRepository = new PrismaSkillsRepository();
  const useCase = new GetSkillsListUseCase(prismaSkillsRepository);

  return useCase;
}
