import { InterventionsRepository } from '@/repositories/interventions-respository';
import { Intervention } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetInterventionUseCaseRequest {
  interventionId: string;
}

interface GetInterventionUseCaseResponse {
  intervention: Intervention;
}

export class GetInterventionUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    interventionId,
  }: GetInterventionUseCaseRequest): Promise<GetInterventionUseCaseResponse> {
    const intervention = await this.interventionRepository.findById(
      interventionId,
    );

    if (!intervention) {
      throw new ResourceNotFoundError();
    }

    return {
      intervention,
    };
  }
}
