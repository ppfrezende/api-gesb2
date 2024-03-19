import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionByPOUseCaseRequest {
  purchaseOrderId: string;
}

interface GetInterventionByPOUseCaseResponse {
  intervention: Intervention | null;
}

export class GetInterventionByPOUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    purchaseOrderId,
  }: GetInterventionByPOUseCaseRequest): Promise<GetInterventionByPOUseCaseResponse> {
    const intervention = await this.interventionsRepository.findByPO(
      purchaseOrderId,
    );

    return {
      intervention,
    };
  }
}
