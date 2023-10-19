import { CustomersRepository } from '@/repositories/customers-repository';
import { Prisma, Customer } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateCustomerUseCaseRequest {
  customerId: string;
  data: Prisma.CustomerUpdateInput;
}

interface UpdateCustomerUseCaseResponse {
  updatedCustomer: Customer | null;
}

export class UpdateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
    data,
  }: UpdateCustomerUseCaseRequest): Promise<UpdateCustomerUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new ResourceNotFoundError();
    }

    const updatedCustomer = await this.customersRepository.update(
      customerId,
      data,
    );

    return {
      updatedCustomer,
    };
  }
}
