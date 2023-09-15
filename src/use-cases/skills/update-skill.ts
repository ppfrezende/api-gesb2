import { SkillsRepository } from '@/repositories/skills-repository';
import { Prisma, Skill } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateSkillUseCaseRequest {
  skillId: string;
  data: Prisma.SkillUpdateInput;
}

interface UpdateSkillUseCaseResponse {
  updatedSkill: Skill | null;
}

export class UpdateSkillUseCase {
  constructor(private skillsRepository: SkillsRepository) {}

  async execute({
    skillId,
    data,
  }: UpdateSkillUseCaseRequest): Promise<UpdateSkillUseCaseResponse> {
    const skill = await this.skillsRepository.findById(skillId);

    if (!skill) {
      throw new ResourceNotFoundError();
    }

    const updatedSkill = await this.skillsRepository.update(skillId, data);

    return {
      updatedSkill,
    };
  }
}
