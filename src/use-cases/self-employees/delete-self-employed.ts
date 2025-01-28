import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { SelfEmployeesRepository } from '@/repositories/self-employees-repository';

interface DeleteSelfEmployedUseCaseRequest {
  selfEmployedId: string;
  deletedBy: string;
}

export class DeleteSelfEmployedUseCase {
  constructor(private selfEmployeesRepository: SelfEmployeesRepository) {}

  async execute({
    selfEmployedId,
    deletedBy,
  }: DeleteSelfEmployedUseCaseRequest): Promise<void> {
    const serviceProvider = await this.selfEmployeesRepository.findById(
      selfEmployedId,
    );

    if (!serviceProvider) {
      throw new ResourceNotFoundError();
    } else {
      await this.selfEmployeesRepository.delete(selfEmployedId, deletedBy);

      return;
    }
  }
}
