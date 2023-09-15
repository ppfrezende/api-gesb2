import { InterventionsRepository } from '@/repositories/interventions-respository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteInterventionUseCaseRequest {
  interventionId: string;
}

export class DeleteInterventionUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    interventionId,
  }: DeleteInterventionUseCaseRequest): Promise<void> {
    const intervention = await this.interventionRepository.findById(
      interventionId,
    );

    if (!intervention) {
      throw new ResourceNotFoundError();
    } else {
      await this.interventionRepository.delete(interventionId);

      return;
    }
  }
}
