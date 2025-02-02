import { BillingOrdersRepository } from '@/repositories/billing-orders-repository';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

interface DeleteBillingOrderUseCaseRequest {
  billingOrderId: string;
  deletedBy: string;
}

export class DeleteBillingOrderUseCase {
  constructor(private billingOrderRepository: BillingOrdersRepository) {}

  async execute({
    billingOrderId,
    deletedBy,
  }: DeleteBillingOrderUseCaseRequest): Promise<void> {
    const billing_order = await this.billingOrderRepository.findById(
      billingOrderId,
    );

    if (!billing_order) {
      throw new ResourceNotFoundError();
    } else {
      await this.billingOrderRepository.delete(billingOrderId, deletedBy);

      return;
    }
  }
}
