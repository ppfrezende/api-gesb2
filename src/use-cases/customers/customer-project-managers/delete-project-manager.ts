import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteProjectManagerUseCaseRequest {
  customerProjectManagerId: string;
  deletedBy: string;
}

export class DeleteProjectManagerUseCase {
  constructor(
    private projectManagersRepository: CustomerProjectManagersRepository,
  ) {}

  async execute({
    customerProjectManagerId,
    deletedBy,
  }: DeleteProjectManagerUseCaseRequest): Promise<void> {
    const project_manager = await this.projectManagersRepository.findById(
      customerProjectManagerId,
    );

    if (!project_manager) {
      throw new ResourceNotFoundError();
    } else {
      await this.projectManagersRepository.delete(
        customerProjectManagerId,
        deletedBy,
      );

      return;
    }
  }
}
