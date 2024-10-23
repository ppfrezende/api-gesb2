import { TechniciansRepository } from '@/repositories/technicians-repository';
import { Technician } from '@prisma/client';

interface GetAllTechniciansListUseCaseResponse {
  totalCount: string;
  allTechnicians: Technician[];
}

export class GetAllTechniciansListUseCase {
  constructor(private techniciansRepository: TechniciansRepository) {}

  async execute(): Promise<GetAllTechniciansListUseCaseResponse> {
    const allTechnicians = await this.techniciansRepository.listAll();

    const totalCount = allTechnicians.length.toString();

    return {
      allTechnicians,
      totalCount,
    };
  }
}
