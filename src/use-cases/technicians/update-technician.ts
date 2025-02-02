import { TechniciansRepository } from '@/repositories/technicians-repository';
import { Prisma, Technician } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateTechnicianUseCaseRequest {
  technicianId: string;
  updatedBy: string;
  data: Prisma.TechnicianUpdateInput;
}

interface UpdateTechnicianUseCaseResponse {
  updatedTechnician: Technician | null;
}

export class UpdateTechnicianUseCase {
  constructor(private technicianRepository: TechniciansRepository) {}

  async execute({
    technicianId,
    updatedBy,
    data,
  }: UpdateTechnicianUseCaseRequest): Promise<UpdateTechnicianUseCaseResponse> {
    const technician = await this.technicianRepository.findById(technicianId);

    if (!technician) {
      throw new ResourceNotFoundError();
    }

    const updatedTechnician = await this.technicianRepository.update(
      technicianId,
      updatedBy,
      data,
    );

    return {
      updatedTechnician,
    };
  }
}
