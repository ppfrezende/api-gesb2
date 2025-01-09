import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';

interface SearchServiceProvidersUseCaseRequest {
  query: string;
  page: number;
}

interface SearchServiceProvidersUseCaseResponse {
  numberOfRegisters: string;
  service_providers: ServiceProvider[];
}

export class SearchServiceProvidersUseCase {
  constructor(
    private serviceProvidersRespository: ServiceProvidersRepository,
  ) {}

  async execute({
    query,
    page,
  }: SearchServiceProvidersUseCaseRequest): Promise<SearchServiceProvidersUseCaseResponse> {
    const service_providers = await this.serviceProvidersRespository.searchMany(
      query,
      page,
    );

    const numberOfRegisters = service_providers.length.toString();

    return {
      service_providers,
      numberOfRegisters,
    };
  }
}
