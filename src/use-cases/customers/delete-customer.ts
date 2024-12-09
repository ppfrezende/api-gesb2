import { CustomersRepository } from '@/repositories/customers-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteCustomerUseCaseRequest {
  customerId: string;
  deletedBy: string;
}

export class DeleteCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
    deletedBy,
  }: DeleteCustomerUseCaseRequest): Promise<void> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new ResourceNotFoundError();
    } else {
      await this.customersRepository.delete(customerId, deletedBy);

      return;
    }
  }
}
