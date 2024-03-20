import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionByTechUseCaseRequest {
  technicianId: string;
}

interface GetInterventionByTechUseCaseResponse {
  intervention: Intervention | null;
}

export class GetInterventionByTechUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    technicianId,
  }: GetInterventionByTechUseCaseRequest): Promise<GetInterventionByTechUseCaseResponse> {
    const intervention = await this.interventionsRepository.findByTech(
      technicianId,
    );

    return {
      intervention,
    };
  }
}
