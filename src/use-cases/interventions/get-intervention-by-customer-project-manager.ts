import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionByCustomerProjectManagerUseCaseRequest {
  customerProjectManagerId: string;
}

interface GetInterventionByCustomerProjectManagerUseCaseResponse {
  intervention: Intervention | null;
}

export class GetInterventionByCustomerProjectManagerUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    customerProjectManagerId,
  }: GetInterventionByCustomerProjectManagerUseCaseRequest): Promise<GetInterventionByCustomerProjectManagerUseCaseResponse> {
    const intervention =
      await this.interventionsRepository.findByCustomerProjectManager(
        customerProjectManagerId,
      );

    return {
      intervention,
    };
  }
}
