import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface CreateCustomerUseCaseRequest {
  name: string;
  userName: string;
}

interface CreateCustomerUseCaseResponse {
  customer: Customer;
}

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    name,
    userName,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customer = await this.customersRepository.create({
      name,
      userName,
    });

    return {
      customer,
    };
  }
}
