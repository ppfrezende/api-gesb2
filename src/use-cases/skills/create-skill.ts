import { SkillsRepository } from '@/repositories/skills-repository';
import { Skill } from '@prisma/client';

interface CreateSkillUseCaseRequest {
  skill_description: string;
  travel_hour: number;
  normal_hour: number;
  id_PO: string;
}

interface CreateSkillUseCaseResponse {
  skill: Skill;
}

export class CreateSkillUseCase {
  constructor(private skillsRepository: SkillsRepository) {}

  async execute({
    skill_description,
    travel_hour,
    normal_hour,
    id_PO,
  }: CreateSkillUseCaseRequest): Promise<CreateSkillUseCaseResponse> {
    const skill = await this.skillsRepository.create({
      skill_description,
      travel_hour,
      normal_hour,
      id_PO,
    });

    return {
      skill,
    };
  }
}
