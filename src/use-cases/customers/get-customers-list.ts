import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface GetCustomersListUseCaseRequest {
  page: number;
}

interface GetCustomersListUseCaseResponse {
  numberOfRegisters: string;
  totalCount: string;
  customers: Customer[] | null;
}

export class GetCustomersListUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    page,
  }: GetCustomersListUseCaseRequest): Promise<GetCustomersListUseCaseResponse> {
    const customers = await this.customersRepository.listMany(page);
    const allCustomers = await this.customersRepository.listAll();

    const numberOfRegisters = customers.length.toString();
    const totalCount = allCustomers.length.toString();

    return {
      numberOfRegisters,
      customers,
      totalCount,
    };
  }
}
