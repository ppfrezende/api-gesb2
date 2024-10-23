import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface GetAllCustomersListUseCaseResponse {
  totalCount: string;
  customers: Customer[] | null;
}

export class GetAllCustomersListUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(): Promise<GetAllCustomersListUseCaseResponse> {
    const customers = await this.customersRepository.listAll();

    const totalCount = customers.length.toString();

    return {
      customers,
      totalCount,
    };
  }
}
