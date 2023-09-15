import { InterventionsRepository } from '@/repositories/interventions-respository';
import { Intervention, Prisma } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateInterventionUseCaseRequest {
  interventionId: string;
  data: Prisma.InterventionUpdateInput;
}

interface UpdateInterventionUseCaseResponse {
  updatedIntervention: Intervention | null;
}

export class UpdateInterventionUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    interventionId,
    data,
  }: UpdateInterventionUseCaseRequest): Promise<UpdateInterventionUseCaseResponse> {
    const intervention = await this.interventionRepository.findById(
      interventionId,
    );

    if (!intervention) {
      throw new ResourceNotFoundError();
    }

    const updatedIntervention = await this.interventionRepository.update(
      interventionId,
      data,
    );

    return {
      updatedIntervention,
    };
  }
}
