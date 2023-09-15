import { SkillsRepository } from '@/repositories/skills-repository';
import { Skill } from '@prisma/client';

interface CreateSkillUseCaseRequest {
  skill_description?: string;
  HN_onshore?: number;
  HN_offshore?: number;
  id_PO?: string;
  userEmail: string;
}

interface CreateSkillUseCaseResponse {
  skill: Skill;
}

export class CreateSkillUseCase {
  constructor(private skillsRepository: SkillsRepository) {}

  async execute({
    skill_description,
    HN_onshore,
    HN_offshore,
    id_PO,
    userEmail,
  }: CreateSkillUseCaseRequest): Promise<CreateSkillUseCaseResponse> {
    const skill = await this.skillsRepository.create({
      skill_description,
      HN_onshore,
      HN_offshore,
      id_PO,
      userEmail,
    });

    return {
      skill,
    };
  }
}
