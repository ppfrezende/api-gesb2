import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface GetCustomersListUseCaseRequest {
  page: number;
}

interface GetCustomersListUseCaseResponse {
  numberOfRegisters: string;
  customers: Customer[] | null;
}

export class GetCustomersListUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    page,
  }: GetCustomersListUseCaseRequest): Promise<GetCustomersListUseCaseResponse> {
    const customers = await this.customersRepository.listMany(page);

    customers.map((customer) => {
      return customer;
    });

    const numberOfRegisters = customers.length.toString();

    return {
      numberOfRegisters,
      customers,
    };
  }
}
