import { InterventionsRepository } from '@/repositories/interventions-respository';
import { Intervention } from '@prisma/client';

interface SearchInterventionsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchInterventionsUseCaseResponse {
  interventions: Intervention[];
}

export class SearchIntersventionUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    query,
    page,
  }: SearchInterventionsUseCaseRequest): Promise<SearchInterventionsUseCaseResponse> {
    const interventions = await this.interventionRepository.searchMany(
      query,
      page,
    );

    return {
      interventions,
    };
  }
}
