import { InterventionsRepository } from '@/repositories/interventions-repository';
import { BillingOrder, Intervention, TimeSheetData } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetInterventionUseCaseRequest {
  interventionId: string;
}

interface GetInterventionUseCaseResponse {
  intervention: Intervention & {
    BillingOrder?: BillingOrder;
    timesheets?: TimeSheetData[];
  };
}

export class GetInterventionUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    interventionId,
  }: GetInterventionUseCaseRequest): Promise<GetInterventionUseCaseResponse> {
    const intervention = await this.interventionsRepository.findById(
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
