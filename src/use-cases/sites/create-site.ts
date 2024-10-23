import { SitesRepository } from '@/repositories/sites-repository';
import { Site } from '@prisma/client';

interface CreateSiteUseCaseRequest {
  name: string;
  description: string;
  operation_zone: string;
  emergency_phone: string;
  emergency_email: string;
  administrator_name: string;
  administrator_phone: string;
  administrator_email: string;
  isOffshore: boolean;
  userName: string;
}

interface CreateSiteUseCaseResponse {
  site: Site;
}

export class CreateSiteUseCase {
  constructor(private sitesRepository: SitesRepository) {}

  async execute({
    name,
    description,
    operation_zone,
    emergency_email,
    emergency_phone,
    administrator_email,
    administrator_name,
    administrator_phone,
    isOffshore,
    userName,
  }: CreateSiteUseCaseRequest): Promise<CreateSiteUseCaseResponse> {
    const site = await this.sitesRepository.create({
      name,
      description,
      operation_zone,
      emergency_email,
      emergency_phone,
      administrator_email,
      administrator_name,
      administrator_phone,
      isOffshore,
      userName,
    });

    return {
      site,
    };
  }
}
