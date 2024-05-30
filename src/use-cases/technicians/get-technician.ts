import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { Technician } from '@prisma/client';
import { TechniciansRepository } from '@/repositories/technicians-repository';

interface GetTechnicianUseCaseRequest {
  technicianId: string;
}

interface GetTechnicianUseCaseResponse {
  technician: Technician | null;
}

export class GetTechnicianUseCase {
  constructor(private techniciansRepository: TechniciansRepository) {}

  async execute({
    technicianId,
  }: GetTechnicianUseCaseRequest): Promise<GetTechnicianUseCaseResponse> {
    const technician = await this.techniciansRepository.findById(technicianId);

    if (!technician) {
      throw new ResourceNotFoundError();
    }

    return {
      technician,
    };
  }
}
