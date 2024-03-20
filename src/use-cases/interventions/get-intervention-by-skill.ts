import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionBySkillUseCaseRequest {
  skillId: string;
}

interface GetInterventionBySkillUseCaseResponse {
  intervention: Intervention | null;
}

export class GetInterventionBySkillUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    skillId,
  }: GetInterventionBySkillUseCaseRequest): Promise<GetInterventionBySkillUseCaseResponse> {
    const intervention = await this.interventionsRepository.findBySkill(
      skillId,
    );

    return {
      intervention,
    };
  }
}
