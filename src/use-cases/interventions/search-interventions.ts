import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface SearchInterventionsUseCaseRequest {
  q: string;
  page: number;
}

interface SearchInterventionsUseCaseResponse {
  numberOfRegisters: string;
  interventions: Intervention[];
}

export class SearchInterventionsUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    q,
    page,
  }: SearchInterventionsUseCaseRequest): Promise<SearchInterventionsUseCaseResponse> {
    const interventions = await this.interventionsRepository.searchMany(
      q,
      page,
    );

    const numberOfRegisters = interventions.length.toString();

    return {
      interventions,
      numberOfRegisters,
    };
  }
}
