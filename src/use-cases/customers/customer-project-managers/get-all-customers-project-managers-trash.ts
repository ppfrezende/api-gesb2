import { CustomerProjectManagersRepository } from '@/repositories/customers-project-managers-repository';
import { CustomerProjectManager } from '@prisma/client';

interface GetAllCustomerProjectManagersTrashListUseCaseResponse {
  totalCount: string;
  customerProjectManagers: CustomerProjectManager[] | null;
}

export class GetAllCustomerProjectManagersTrashListUseCase {
  constructor(
    private customerProjectManagersRepository: CustomerProjectManagersRepository,
  ) {}

  async execute(): Promise<GetAllCustomerProjectManagersTrashListUseCaseResponse> {
    const customerProjectManagers =
      await this.customerProjectManagersRepository.listAllCustomerProjectManagersTrash();

    const totalCount = customerProjectManagers.length.toString();

    return {
      customerProjectManagers,
      totalCount,
    };
  }
}
