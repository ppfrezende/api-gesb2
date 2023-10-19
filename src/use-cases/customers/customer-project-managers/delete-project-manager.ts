import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteProjectManagerUseCaseRequest {
  projectManagerId: string;
}

export class DeleteProjectManagerUseCase {
  constructor(
    private projectManagersRepository: CustomerProjectManagersRepository,
  ) {}

  async execute({
    projectManagerId,
  }: DeleteProjectManagerUseCaseRequest): Promise<void> {
    const project_manager = await this.projectManagersRepository.findById(
      projectManagerId,
    );

    if (!project_manager) {
      throw new ResourceNotFoundError();
    } else {
      await this.projectManagersRepository.delete(projectManagerId);

      return;
    }
  }
}
