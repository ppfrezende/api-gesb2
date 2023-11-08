import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface CreateInterventionUseCaseRequest {
  progressive: string;
  intervention_number: string;
  po_number: string;
  job_number: string;
  isOffshore: boolean;
  initial_at: Date;
  finished_at?: Date;
  technicianId: string;
  siteId: string;
  customerId: string;
  customerProjectManagerId: string;
  purchaseOrderId: string;
  skillId: string;
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
    po_number,
    job_number,
    isOffshore,
    initial_at,
    finished_at,
    technicianId,
    siteId,
    customerId,
    customerProjectManagerId,
    purchaseOrderId,
    skillId,
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
      po_number,
      job_number,
      isOffshore,
      initial_at,
      finished_at,
      technicianId,
      siteId,
      customerId,
      customerProjectManagerId,
      purchaseOrderId,
      skillId,
      userName,
    });

    return {
      intervention,
    };
  }
}
