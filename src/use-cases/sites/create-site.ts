import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface CreateSiteUseCaseRequest {
  description: string;
  isOffshore: boolean;
  userName: string;
}

interface CreateSiteUseCaseResponse {
  site: Site;
}

export class CreateSiteUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    description,
    isOffshore,
    userName,
  }: CreateSiteUseCaseRequest): Promise<CreateSiteUseCaseResponse> {
    const site = await this.sitesRepository.create({
      description,
      isOffshore,
      userName,
    });

    return {
      site,
    };
  }
}
