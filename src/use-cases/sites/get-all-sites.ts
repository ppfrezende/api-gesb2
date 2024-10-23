import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface GetAllSitesListUseCaseResponse {
  totalCount: string;
  sites: Site[] | null;
}

export class GetAllSitesListUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute(): Promise<GetAllSitesListUseCaseResponse> {
    const sites = await this.sitesRepository.listAll();

    const totalCount = sites.length.toString();

    return {
      totalCount,
      sites,
    };
  }
}
