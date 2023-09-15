import { SitesRepository } from '@/repositories/sites-repository';
import { Prisma, Site } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateSiteUseCaseRequest {
  siteId: string;
  data: Prisma.SiteUpdateInput;
}

interface UpdateSiteUseCaseResponse {
  updatedSite: Site | null;
}

export class UpdateSiteUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    siteId,
    data,
  }: UpdateSiteUseCaseRequest): Promise<UpdateSiteUseCaseResponse> {
    const site = await this.sitesRepository.findById(siteId);

    if (!site) {
      throw new ResourceNotFoundError();
    }

    const updatedSite = await this.sitesRepository.update(siteId, data);

    return {
      updatedSite,
    };
  }
}
