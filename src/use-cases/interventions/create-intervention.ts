import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface CreateInterventionUseCaseRequest {
  progressive: string;
  intervention_number: string;
  customer_po_number: string;
  job_number: string;
  isMonthly: boolean;
  initial_at: Date;
  finished_at?: Date | string;
  technicianId: string;
  siteId: string;
  customerId: string;
  customerProjectManagerId: string;
  billingOrderId?: string | null;
  total_value?: number | null;
  userName: string;
}

interface CreateInterventionUseCaseResponse {
  intervention: Intervention;
}

export class CreateInterventionUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    progressive,
    intervention_number,
    customer_po_number,
    job_number,
    isMonthly,
    initial_at,
    finished_at,
    technicianId,
    siteId,
    customerId,
    customerProjectManagerId,
    billingOrderId,
    total_value,
    userName,
  }: CreateInterventionUseCaseRequest): Promise<CreateInterventionUseCaseResponse> {
    const interventionWithSameProgressive =
      await this.interventionsRepository.findByProgressive(progressive);

    if (interventionWithSameProgressive) {
      throw new ResourceAlreadyExists();
    }

    const intervention = await this.interventionsRepository.create({
      progressive,
      intervention_number,
      customer_po_number,
      job_number,
      isMonthly,
      initial_at,
      finished_at,
      technicianId,
      siteId,
      customerId,
      customerProjectManagerId,
      billingOrderId,
      total_value,
      userName,
    });

    return {
      intervention,
    };
  }
}
