import { PrismaSkillsRepository } from '@/repositories/prisma/prisma-skills-repository';
import { GetSkillUseCase } from '../../skills/get-skill';

export function makeGetSkillUseCase() {
  const prismaSkillsRepository = new PrismaSkillsRepository();
  const useCase = new GetSkillUseCase(prismaSkillsRepository);

  return useCase;
}
