import { SitesRepository } from '@/repositories/sites-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { Site } from '@prisma/client';

interface GetSiteUseCaseRequest {
  siteId: string;
}

interface GetSiteUseCaseResponse {
  site: Site | null;
}

export class GetSiteUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    siteId,
  }: GetSiteUseCaseRequest): Promise<GetSiteUseCaseResponse> {
    const site = await this.sitesRepository.findById(siteId);

    if (!site) {
      throw new ResourceNotFoundError();
    }

    return {
      site,
    };
  }
}
