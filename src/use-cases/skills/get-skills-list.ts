import { SkillsRepository } from '@/repositories/skills-repository';
import { Skill } from '@prisma/client';

interface GetSkillsListUseCaseRequest {
  page: number;
}

interface GetSkillsListUseCaseResponse {
  numberOfRegisters: string;
  skills: Skill[] | null;
}

export class GetSkillsListUseCase {
  constructor(private skillsRepository: SkillsRepository) {}

  async execute({
    page,
  }: GetSkillsListUseCaseRequest): Promise<GetSkillsListUseCaseResponse> {
    const skills = await this.skillsRepository.listMany(page);

    skills.map((skill) => {
      return skill;
    });

    const numberOfRegisters = skills.length.toString();

    return {
      numberOfRegisters,
      skills,
    };
  }
}
