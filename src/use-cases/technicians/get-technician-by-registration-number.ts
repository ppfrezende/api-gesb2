import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { Technician } from '@prisma/client';
import { TechniciansRepository } from '@/repositories/technicians-repository';

interface GetTechnicianByRegistrationNumberUseCaseRequest {
  registration_number: string;
}

interface GetTechnicianByRegistrationNumberUseCaseResponse {
  technician: Technician | null;
}

export class GetTechnicianByRegistrationNumberUseCase {
  constructor(private techniciansRepository: TechniciansRepository) {}

  async execute({
    registration_number,
  }: GetTechnicianByRegistrationNumberUseCaseRequest): Promise<GetTechnicianByRegistrationNumberUseCaseResponse> {
    const technician =
      await this.techniciansRepository.findByRegistrationNumber(
        registration_number,
      );

    if (!technician) {
      throw new ResourceNotFoundError();
    }

    return {
      technician,
    };
  }
}
