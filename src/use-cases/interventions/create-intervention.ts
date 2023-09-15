import { InterventionsRepository } from '@/repositories/interventions-respository';
import { Intervention } from '@prisma/client';

interface CreateInterventionUseCaseRequest {
  description: string;
  customer_email: string;
  initial_at: Date;
  finished_at?: Date;
  purchaseOrderId: string;
  employeeId?: string;
  serviceProviderId?: string;
  siteId: string;
  userEmail: string;
}

interface CreateInterventionUseCaseResponse {
  intervention: Intervention;
}

export class CreateInterventionUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    customer_email,
    description,
    initial_at,
    finished_at,
    purchaseOrderId,
    employeeId,
    serviceProviderId,
    siteId,
    userEmail,
  }: CreateInterventionUseCaseRequest): Promise<CreateInterventionUseCaseResponse> {
    const intervention = await this.interventionRepository.create({
      customer_email,
      description,
      initial_at,
      finished_at,
      purchaseOrderId,
      employeeId,
      serviceProviderId,
      siteId,
      userEmail,
    });

    return {
      intervention,
    };
  }
}
