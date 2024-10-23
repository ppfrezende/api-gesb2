import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionByBillingOrderUseCaseRequest {
  billingOrderId: string;
}

interface GetInterventionByBillingOrderUseCaseResponse {
  intervention: Intervention | null;
}

export class GetInterventionByBillingOrderUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    billingOrderId,
  }: GetInterventionByBillingOrderUseCaseRequest): Promise<GetInterventionByBillingOrderUseCaseResponse> {
    const intervention = await this.interventionsRepository.findByBillingOrder(
      billingOrderId,
    );

    return {
      intervention,
    };
  }
}
