import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionBySiteUseCaseRequest {
  siteId: string;
}

interface GetInterventionBySiteUseCaseResponse {
  intervention: Intervention | null;
}

export class GetInterventionBySiteUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    siteId,
  }: GetInterventionBySiteUseCaseRequest): Promise<GetInterventionBySiteUseCaseResponse> {
    const intervention = await this.interventionsRepository.findBySite(siteId);

    return {
      intervention,
    };
  }
}
