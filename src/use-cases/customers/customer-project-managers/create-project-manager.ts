import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { CustomerProjectManager } from '@prisma/client';

interface CreateProjectManagerUseCaseRequest {
  name?: string;
  customerId: string;
}

interface CreateProjectManagerUseCaseResponse {
  project_manager: CustomerProjectManager;
}

export class CreateProjectManagerUseCase {
  constructor(
    private customerProjectManagersRepository: CustomerProjectManagersRepository,
  ) {}

  async execute({
    name,
    customerId,
  }: CreateProjectManagerUseCaseRequest): Promise<CreateProjectManagerUseCaseResponse> {
    const project_manager = await this.customerProjectManagersRepository.create(
      {
        name,
        customerId,
      },
    );

    return {
      project_manager,
    };
  }
}
