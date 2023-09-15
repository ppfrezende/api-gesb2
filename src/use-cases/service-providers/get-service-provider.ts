import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetServiceProviderProfileUseCaseRequest {
  serviceProviderId: string;
}

interface GetServiceProviderProfileUseCaseResponse {
  service_provider: ServiceProvider;
}

export class GetServiceProviderProfileUseCase {
  constructor(private serviceProvidersRepository: ServiceProvidersRepository) {}

  async execute({
    serviceProviderId,
  }: GetServiceProviderProfileUseCaseRequest): Promise<GetServiceProviderProfileUseCaseResponse> {
    const service_provider = await this.serviceProvidersRepository.findById(
      serviceProviderId,
    );

    if (!service_provider) {
      throw new ResourceNotFoundError();
    }

    return {
      service_provider,
    };
  }
}
