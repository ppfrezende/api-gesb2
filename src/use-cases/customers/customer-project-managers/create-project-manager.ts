import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { CustomerProjectManager } from '@prisma/client';

interface CreateProjectManagerUseCaseRequest {
  name: string;
  email: string;
  job_title: string;
  phone: string;
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
    email,
    job_title,
    phone,
    customerId,
  }: CreateProjectManagerUseCaseRequest): Promise<CreateProjectManagerUseCaseResponse> {
    const project_manager = await this.customerProjectManagersRepository.create(
      {
        name,
        email,
        job_title,
        phone,
        customerId,
      },
    );

    return {
      project_manager,
    };
  }
}
