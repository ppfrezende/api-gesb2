import { TechniciansRepository } from '@/repositories/technicians-repository';
import { Technician } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface CreateTechnicianUseCaseRequest {
  id: string;
  name: string;
  email: string;
  job_title: string;
  registration_number: string;
  userName: string;
  skills: string;
}

interface CreateTechnicianUseCaseResponse {
  technician: Technician;
}

export class CreateTechnicianUseCase {
  constructor(private technicianRepository: TechniciansRepository) {}

  async execute({
    id,
    name,
    email,
    job_title,
    registration_number,
    userName,
    skills,
  }: CreateTechnicianUseCaseRequest): Promise<CreateTechnicianUseCaseResponse> {
    const techniciansWithSameEmail =
      await this.technicianRepository.findByEmail(email);

    if (techniciansWithSameEmail) {
      throw new ResourceAlreadyExists();
    }

    const technician = await this.technicianRepository.create({
      id,
      name,
      email,
      job_title,
      registration_number,
      userName,
      skills,
    });

    return {
      technician,
    };
  }
}
