import { TechniciansRepository } from '@/repositories/technician-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteTechnicianUseCaseRequest {
  technicianId: string;
}

export class DeleteTechnicianUseCase {
  constructor(private technicianRepository: TechniciansRepository) {}

  async execute({
    technicianId,
  }: DeleteTechnicianUseCaseRequest): Promise<void> {
    const technician = await this.technicianRepository.findById(technicianId);

    if (!technician) {
      throw new ResourceNotFoundError();
    } else {
      await this.technicianRepository.delete(technicianId);

      return;
    }
  }
}
