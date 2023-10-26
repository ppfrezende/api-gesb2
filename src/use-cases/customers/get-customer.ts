import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface GetCustomerUseCaseRequest {
  customerId: string;
}

interface GetCustomerUseCaseResponse {
  customer: Customer | null;
}

export class GetCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
  }: GetCustomerUseCaseRequest): Promise<GetCustomerUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId);

    return {
      customer,
    };
  }
}
