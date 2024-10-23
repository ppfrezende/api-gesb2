import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface GetSitesListUseCaseRequest {
  page: number;
}

interface GetSitesListUseCaseResponse {
  numberOfRegisters: string;
  sites: Site[] | null;
}

export class GetSitesListUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    page,
  }: GetSitesListUseCaseRequest): Promise<GetSitesListUseCaseResponse> {
    const sites = await this.sitesRepository.listMany(page);

    const numberOfRegisters = sites.length.toString();

    return {
      numberOfRegisters,
      sites,
    };
  }
}
