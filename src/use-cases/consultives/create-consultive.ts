import { ConsultivesRepository } from '@/repositories/consultives-repository';
import { Consultive } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface CreateConsultiveUseCaseRequest {
  progressive: string;
  intervention_number: string;
  po_number: string;
  job_number: string;
  isOffshore: boolean;
  initial_at: Date;
  finished_at: Date;
  technicianId: string;
  siteId: string;
  customerId: string;
  customerProjectManagerId: string;
  purchaseOrderId: string;
  skillId: string;
  userName: string;
}

interface CreateConsultiveUseCaseResponse {
  consultive: Consultive;
}

export class CreateConsultiveUseCase {
  constructor(private consultivesRepository: ConsultivesRepository) {}

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
  }: CreateConsultiveUseCaseRequest): Promise<CreateConsultiveUseCaseResponse> {
    const consultiveWithSameProgressive =
      await this.consultivesRepository.findByProgressive(progressive);

    if (consultiveWithSameProgressive) {
      throw new ResourceAlreadyExists();
    }

    const consultive = await this.consultivesRepository.create({
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
      consultive,
    };
  }
}
