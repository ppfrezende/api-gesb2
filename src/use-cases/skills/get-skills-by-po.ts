import { SkillsRepository } from '@/repositories/skills-repository';
import { Skill } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetSkillsByPOUseCaseRequest {
  id_PO: string;
}

interface GetSkillsByPOUseCaseResponse {
  numberOfRegisters: string;
  purchaseOrderSkills: Skill[] | null;
}

export class GetSkillsByPOUseCase {
  constructor(private skillsRepository: SkillsRepository) {}

  async execute({
    id_PO,
  }: GetSkillsByPOUseCaseRequest): Promise<GetSkillsByPOUseCaseResponse> {
    const skills = await this.skillsRepository.findByPO(id_PO);

    if (!skills) {
      throw new ResourceNotFoundError();
    }

    const purchaseOrderSkills = skills.map((skill) => {
      return skill;
    });

    const numberOfRegisters = skills.length.toString();

    return {
      numberOfRegisters,
      purchaseOrderSkills,
    };
  }
}
