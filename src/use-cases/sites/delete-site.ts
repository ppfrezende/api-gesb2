import { SitesRepository } from '@/repositories/sites-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteSiteUseCaseRequest {
  siteId: string;
  deletedBy: string;
}

export class DeleteSiteUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    siteId,
    deletedBy,
  }: DeleteSiteUseCaseRequest): Promise<void> {
    const site = await this.sitesRepository.findById(siteId);

    if (!site) {
      throw new ResourceNotFoundError();
    } else {
      await this.sitesRepository.delete(siteId, deletedBy);

      return;
    }
  }
}
