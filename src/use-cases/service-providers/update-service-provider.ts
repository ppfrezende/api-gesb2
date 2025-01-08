import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { Prisma, ServiceProvider } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { deleteFile } from '@/utils/file';

interface UpdateServiceProviderProfileUseCaseRequest {
  serviceProviderId: string;
  updatedBy: string;
  data: Prisma.ServiceProviderUpdateInput;
}

interface UpdateEServiceProviderProfileUseCaseResponse {
  updatedServiceProvider: ServiceProvider | null;
}

export class UpdateServiceProviderProfileUseCase {
  constructor(private serviceProviderRepository: ServiceProvidersRepository) {}

  async execute({
    serviceProviderId,
    updatedBy,
    data,
  }: UpdateServiceProviderProfileUseCaseRequest): Promise<UpdateEServiceProviderProfileUseCaseResponse> {
    const service_provider = await this.serviceProviderRepository.findById(
      serviceProviderId,
    );

    if (!service_provider) {
      throw new ResourceNotFoundError();
    }

    if (service_provider.avatar) {
      await deleteFile(`tmp/avatar/${service_provider.avatar!}`);
    }

    const updatedServiceProvider = await this.serviceProviderRepository.update(
      serviceProviderId,
      updatedBy,
      data,
    );

    return {
      updatedServiceProvider,
    };
  }
}
