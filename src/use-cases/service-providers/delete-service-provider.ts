import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteServiceProviderUseCaseRequest {
  serviceProviderId: string;
  deletedBy: string;
}

export class DeleteServiceProviderUseCase {
  constructor(private serviceProvidersRepository: ServiceProvidersRepository) {}

  async execute({
    serviceProviderId,
    deletedBy,
  }: DeleteServiceProviderUseCaseRequest): Promise<void> {
    const serviceProvider = await this.serviceProvidersRepository.findById(
      serviceProviderId,
    );

    if (!serviceProvider) {
      throw new ResourceNotFoundError();
    } else {
      await this.serviceProvidersRepository.delete(
        serviceProviderId,
        deletedBy,
      );

      return;
    }
  }
}
