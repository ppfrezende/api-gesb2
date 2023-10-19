import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { CustomerProjectManager, Prisma } from '@prisma/client';

interface UpdateProjectManagerUseCaseRequest {
  projectManagerId: string;
  data: Prisma.CustomerProjectManagerUpdateInput;
}

interface UpdateProjectManagerUseCaseResponse {
  updatedProjectManager: CustomerProjectManager | null;
}

export class UpdateProjectManagerUseCase {
  constructor(
    private projectManagersRepository: CustomerProjectManagersRepository,
  ) {}

  async execute({
    projectManagerId,
    data,
  }: UpdateProjectManagerUseCaseRequest): Promise<UpdateProjectManagerUseCaseResponse> {
    const projectManager = await this.projectManagersRepository.findById(
      projectManagerId,
    );

    if (!projectManager) {
      throw new ResourceNotFoundError();
    }

    const updatedProjectManager = await this.projectManagersRepository.update(
      projectManagerId,
      data,
    );

    return {
      updatedProjectManager,
    };
  }
}
