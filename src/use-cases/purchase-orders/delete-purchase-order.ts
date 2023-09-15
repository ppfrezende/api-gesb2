import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeletePurchaseOrderUseCaseRequest {
  purchaseOrderId: string;
}

export class DeletePurchaseOrderUseCase {
  constructor(private purchaseOrderRepository: PurchaseOrdersRepository) {}

  async execute({
    purchaseOrderId,
  }: DeletePurchaseOrderUseCaseRequest): Promise<void> {
    const purchase_order = await this.purchaseOrderRepository.findById(
      purchaseOrderId,
    );

    if (!purchase_order) {
      throw new ResourceNotFoundError();
    } else {
      await this.purchaseOrderRepository.delete(purchaseOrderId);

      return;
    }
  }
}
