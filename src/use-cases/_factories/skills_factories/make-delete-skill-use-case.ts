import { PrismaSkillsRepository } from '@/repositories/prisma/prisma-skills-repository';
import { DeleteSkillUseCase } from '../../skills/delete-skill';

export function makeDeleteSkillUseCase() {
  const prismaSkillsRepository = new PrismaSkillsRepository();
  const useCase = new DeleteSkillUseCase(prismaSkillsRepository);

  return useCase;
}
