import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';

interface GetServiceProvidersTrashUseCaseResponse {
  totalCount: string;
  service_providers: ServiceProvider[];
}

export class GetServiceProvidersTrashUseCase {
  constructor(private serviceProvidersRepository: ServiceProvidersRepository) {}

  async execute(): Promise<GetServiceProvidersTrashUseCaseResponse> {
    const service_providers =
      await this.serviceProvidersRepository.listAllServiceProvidersTrash();

    const totalCount = service_providers.length.toString();

    return {
      service_providers,
      totalCount,
    };
  }
}
