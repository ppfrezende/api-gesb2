import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface GetAllSitesTrashListUseCaseResponse {
  totalCount: string;
  sites: Site[] | null;
}

export class GetAllSitesTrashListUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute(): Promise<GetAllSitesTrashListUseCaseResponse> {
    const sites = await this.sitesRepository.listAllSitesTrash();

    const totalCount = sites.length.toString();

    return {
      totalCount,
      sites,
    };
  }
}
