import { SkillsRepository } from '@/repositories/skills-repository';
import { Skill } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetSkillUseCaseRequest {
  skillId: string;
}

interface GetSkillUseCaseResponse {
  skill: Skill | null;
}

export class GetSkillUseCase {
  constructor(private skillsRepository: SkillsRepository) {}

  async execute({
    skillId,
  }: GetSkillUseCaseRequest): Promise<GetSkillUseCaseResponse> {
    const skill = await this.skillsRepository.findById(skillId);

    if (!skill) {
      throw new ResourceNotFoundError();
    }

    return {
      skill,
    };
  }
}
