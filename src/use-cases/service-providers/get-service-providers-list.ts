import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';

interface GetServiceProvidersUseCaseRequest {
  page: number;
}

interface GetServiceProvidersUseCaseResponse {
  numberOfRegisters: string;
  totalCount: string;
  service_providers: ServiceProvider[];
}

export class GetServiceProvidersUseCase {
  constructor(private serviceProvidersRepository: ServiceProvidersRepository) {}

  async execute({
    page,
  }: GetServiceProvidersUseCaseRequest): Promise<GetServiceProvidersUseCaseResponse> {
    const service_providers = await this.serviceProvidersRepository.listMany(
      page,
    );
    const allServiceProviders = await this.serviceProvidersRepository.listAll();

    const numberOfRegisters = service_providers.length.toString();
    const totalCount = allServiceProviders.length.toString();

    return {
      service_providers,
      numberOfRegisters,
      totalCount,
    };
  }
}
