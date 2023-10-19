import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { CustomerProjectManager } from '@prisma/client';

interface GetProjectManagerListByCustomerIdUseCaseRequest {
  customerId: string;
}

interface GetProjectManagerListByCustomerIdUseCaseResponse {
  numberOfRegisters: string;
  customer_project_managers: CustomerProjectManager[] | null;
}

export class GetProjectManagersListByCustomerIdUseCase {
  constructor(
    private projectManagersRepository: CustomerProjectManagersRepository,
  ) {}

  async execute({
    customerId,
  }: GetProjectManagerListByCustomerIdUseCaseRequest): Promise<GetProjectManagerListByCustomerIdUseCaseResponse> {
    const customer_project_managers =
      await this.projectManagersRepository.findByCustomerId(customerId);

    if (!customer_project_managers) {
      throw new ResourceNotFoundError();
    }

    customer_project_managers.map((project_manager) => {
      return project_manager;
    });

    const numberOfRegisters = customer_project_managers.length.toString();

    return {
      numberOfRegisters,
      customer_project_managers,
    };
  }
}
