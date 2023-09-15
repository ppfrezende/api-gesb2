import { PrismaSkillsRepository } from '@/repositories/prisma/prisma-skills-repository';
import { CreateSkillUseCase } from '../../skills/create-skill';

export function makeCreateSkillUseCase() {
  const prismaSkillsRepository = new PrismaSkillsRepository();
  const useCase = new CreateSkillUseCase(prismaSkillsRepository);

  return useCase;
}
