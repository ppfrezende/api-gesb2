import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';

interface GetServiceProvidersUseCaseRequest {
  page: number;
}

interface GetServiceProvidersUseCaseResponse {
  numberOfRegisters: string;
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

    service_providers.map((employee) => {
      return employee;
    });

    const numberOfRegisters = service_providers.length.toString();

    return {
      service_providers,
      numberOfRegisters,
    };
  }
}
