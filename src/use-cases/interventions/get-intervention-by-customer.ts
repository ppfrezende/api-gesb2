import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionByCustomerUseCaseRequest {
  customerId: string;
}

interface GetInterventionByCustomerUseCaseResponse {
  intervention: Intervention | null;
}

export class GetInterventionByCustomerUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    customerId,
  }: GetInterventionByCustomerUseCaseRequest): Promise<GetInterventionByCustomerUseCaseResponse> {
    const intervention = await this.interventionsRepository.findByCustomer(
      customerId,
    );

    return {
      intervention,
    };
  }
}
