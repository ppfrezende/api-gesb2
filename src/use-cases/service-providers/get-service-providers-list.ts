import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';

interface GetServiceProvidersUseCaseRequest {
  page: number;
  isActive: boolean;
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
    isActive,
  }: GetServiceProvidersUseCaseRequest): Promise<GetServiceProvidersUseCaseResponse> {
    if (isActive === true) {
      const service_providers = await this.serviceProvidersRepository.listMany(
        page,
      );
      const allServiceProviders =
        await this.serviceProvidersRepository.listAllActive();

      const numberOfRegisters = service_providers.length.toString();
      const totalCount = allServiceProviders.length.toString();
      return {
        service_providers,
        numberOfRegisters,
        totalCount,
      };
    } else {
      const service_providers =
        await this.serviceProvidersRepository.listManyInactive(page);
      const allServiceProviders =
        await this.serviceProvidersRepository.listAllInactive();

      const numberOfRegisters = service_providers.length.toString();
      const totalCount = allServiceProviders.length.toString();
      return {
        service_providers,
        numberOfRegisters,
        totalCount,
      };
    }
  }
}
