import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface SearchSitesUseCaseRequest {
  query: string;
  page: number;
}

interface SearchSitesUseCaseResponse {
  numberOfRegisters: string;
  sites: Site[] | null;
}

export class SearchSitesUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    query,
    page,
  }: SearchSitesUseCaseRequest): Promise<SearchSitesUseCaseResponse> {
    const sites = await this.sitesRepository.searchMany(query, page);

    const numberOfRegisters = sites.length.toString();

    return {
      numberOfRegisters,
      sites,
    };
  }
}
