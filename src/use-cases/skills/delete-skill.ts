import { SkillsRepository } from '@/repositories/skills-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteSkillUseCaseRequest {
  skillId: string;
}

export class DeleteSkillUseCase {
  constructor(private skillsRepository: SkillsRepository) {}

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
