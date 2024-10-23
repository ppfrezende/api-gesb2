import { TechniciansRepository } from '@/repositories/technicians-repository';
import { Technician } from '@prisma/client';

interface SearchTechniciansUseCaseRequest {
  query: string;
  page: number;
}

interface SearchTechniciansUseCaseResponse {
  technicians: Technician[];
  numberOfRegisters: string;
}

export class SearchTechniciansUseCase {
  constructor(private techniciansRepository: TechniciansRepository) {}

  async execute({
    query,
    page,
  }: SearchTechniciansUseCaseRequest): Promise<SearchTechniciansUseCaseResponse> {
    const technicians = await this.techniciansRepository.searchMany(
      query,
      page,
    );

    const numberOfRegisters = technicians.length.toString();

    return {
      technicians,
      numberOfRegisters,
    };
  }
}
