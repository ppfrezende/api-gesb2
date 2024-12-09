import { TechniciansRepository } from '@/repositories/technicians-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteTechnicianUseCaseRequest {
  technicianId: string;
  deletedBy: string;
}

export class DeleteTechnicianUseCase {
  constructor(private technicianRepository: TechniciansRepository) {}

  async execute({
    technicianId,
    deletedBy,
  }: DeleteTechnicianUseCaseRequest): Promise<void> {
    const technician = await this.technicianRepository.findById(technicianId);

    if (!technician) {
      throw new ResourceNotFoundError();
    } else {
      await this.technicianRepository.delete(technicianId, deletedBy);

      return;
    }
  }
}
