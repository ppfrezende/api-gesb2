import { PrismaSkillsRepository } from '@/repositories/prisma/prisma-skills-repository';
import { UpdateSkillUseCase } from '../../skills/update-skill';

export function makeUpdateSkillUseCase() {
  const prismaSkillsRepository = new PrismaSkillsRepository();
  const useCase = new UpdateSkillUseCase(prismaSkillsRepository);

  return useCase;
}
