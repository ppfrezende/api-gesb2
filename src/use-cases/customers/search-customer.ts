import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface SearchCustomersUseCaseRequest {
  query: string;
  page: number;
}

interface SearchCustomersUseCaseResponse {
  numberOfRegisters: string;
  customers: Customer[] | null;
}

export class SearchCustomersUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    query,
    page,
  }: SearchCustomersUseCaseRequest): Promise<SearchCustomersUseCaseResponse> {
    const customers = await this.customersRepository.searchMany(query, page);

    const numberOfRegisters = customers.length.toString();

    return { numberOfRegisters, customers };
  }
}
