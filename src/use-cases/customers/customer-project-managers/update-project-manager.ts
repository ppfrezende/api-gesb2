import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { CustomerProjectManager, Prisma } from '@prisma/client';

interface UpdateProjectManagerUseCaseRequest {
  customerProjectManagerId: string;
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
    customerProjectManagerId,
    data,
  }: UpdateProjectManagerUseCaseRequest): Promise<UpdateProjectManagerUseCaseResponse> {
    const projectManager = await this.projectManagersRepository.findById(
      customerProjectManagerId,
    );

    if (!projectManager) {
      throw new ResourceNotFoundError();
    }

    const updatedProjectManager = await this.projectManagersRepository.update(
      customerProjectManagerId,
      data,
    );

    return {
      updatedProjectManager,
    };
  }
}
