import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface CreateSiteUseCaseRequest {
  description: string;
  on_offshore: boolean;
  userName: string;
}

interface CreateSiteUseCaseResponse {
  site: Site;
}

export class CreateSiteUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    description,
    on_offshore,
    userName,
  }: CreateSiteUseCaseRequest): Promise<CreateSiteUseCaseResponse> {
    const site = await this.sitesRepository.create({
      description,
      on_offshore,
      userName,
    });

    return {
      site,
    };
  }
}
