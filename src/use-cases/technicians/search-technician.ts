import { TechniciansRepository } from '@/repositories/technician-repository';
import { Technician } from '@prisma/client';

interface SearchTechniciansUseCaseRequest {
  query: string;
  page: number;
}

interface SearchTechniciansUseCaseResponse {
  technicians: Technician[];
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

    return {
      technicians,
    };
  }
}
