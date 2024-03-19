import { SkillsRepository } from '@/repositories/skills-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InterventionsRepository } from '@/repositories/interventions-repository';

interface DeleteSkillUseCaseRequest {
  skillId: string;
}

export class DeleteSkillUseCase {
  constructor(
    private skillsRepository: SkillsRepository,
    private interventionsRepository: InterventionsRepository,
  ) {}

  async execute({ skillId }: DeleteSkillUseCaseRequest): Promise<void> {
    const skill = await this.skillsRepository.findById(skillId);

    if (!skill) {
      throw new ResourceNotFoundError();
    } else {
      await this.skillsRepository.delete(skillId);

      return;
    }
  }
}
