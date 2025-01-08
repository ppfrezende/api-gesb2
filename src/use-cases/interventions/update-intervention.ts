import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention, Prisma } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateInterventionUseCaseRequest {
  interventionId: string;
  updatedBy: string;
  data: Prisma.InterventionUncheckedUpdateInput;
}

interface UpdateInterventionUseCaseResponse {
  updatedIntervention: Intervention | null;
}

export class UpdateInterventionUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    interventionId,
    updatedBy,
    data,
  }: UpdateInterventionUseCaseRequest): Promise<UpdateInterventionUseCaseResponse> {
    const intervention = await this.interventionsRepository.findById(
      interventionId,
    );

    if (!intervention) {
      throw new ResourceNotFoundError();
    }

    const updatedIntervention = await this.interventionsRepository.update(
      interventionId,
      updatedBy,
      data,
    );

    return {
      updatedIntervention,
    };
  }
}
