import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface SearchSitesUseCaseRequest {
  query: string;
  page: number;
}

interface SearchSitesUseCaseResponse {
  sites: Site[] | null;
}

export class SearchSitesUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    query,
    page,
  }: SearchSitesUseCaseRequest): Promise<SearchSitesUseCaseResponse> {
    const sites = await this.sitesRepository.searchMany(query, page);

    return {
      sites,
    };
  }
}
