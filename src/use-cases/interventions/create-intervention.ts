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
  currency: string;
  expense_administration_tax: number;
  technicianId: string;
  siteId: string;
  customerId: string;
  customerProjectManagerId: string;
  billingOrderId?: string | null;
  total_value?: number | null;
  userId: string;
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
    currency,
    expense_administration_tax,
    technicianId,
    siteId,
    customerId,
    customerProjectManagerId,
    billingOrderId,
    total_value,
    userId,
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
      currency,
      expense_administration_tax,
      technicianId,
      siteId,
      customerId,
      customerProjectManagerId,
      billingOrderId,
      total_value,
      userId,
    });

    return {
      intervention,
    };
  }
}
