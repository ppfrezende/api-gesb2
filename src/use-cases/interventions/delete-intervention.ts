import { InterventionsRepository } from '@/repositories/interventions-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteInterventionUseCaseRequest {
  interventionId: string;
}

export class DeleteInterventionUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    interventionId,
  }: DeleteInterventionUseCaseRequest): Promise<void> {
    const intervention = await this.interventionsRepository.findById(
      interventionId,
    );

    if (!intervention) {
      throw new ResourceNotFoundError();
    } else {
      await this.interventionsRepository.delete(interventionId);

      return;
    }
  }
}
