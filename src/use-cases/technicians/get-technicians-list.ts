import { TechniciansRepository } from '@/repositories/technicians-repository';
import { Technician } from '@prisma/client';

interface GetTechniciansListUseCaseRequest {
  page: number;
}

interface GetTechniciansListUseCaseResponse {
  numberOfRegisters: string;
  technicians: Technician[];
}

export class GetTechniciansListUseCase {
  constructor(private techniciansRepository: TechniciansRepository) {}

  async execute({
    page,
  }: GetTechniciansListUseCaseRequest): Promise<GetTechniciansListUseCaseResponse> {
    const technicians = await this.techniciansRepository.listMany(page);

    technicians.map((technician) => {
      return technician;
    });

    const numberOfRegisters = technicians.length.toString();

    return {
      technicians,
      numberOfRegisters,
    };
  }
}
