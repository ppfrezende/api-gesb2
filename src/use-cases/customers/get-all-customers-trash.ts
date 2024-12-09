import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface GetAllCustomersTrashListUseCaseResponse {
  totalCount: string;
  customers: Customer[] | null;
}

export class GetAllCustomersTrashListUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(): Promise<GetAllCustomersTrashListUseCaseResponse> {
    const customers = await this.customersRepository.listAllCustomersTrash();

    const totalCount = customers.length.toString();

    return {
      customers,
      totalCount,
    };
  }
}
