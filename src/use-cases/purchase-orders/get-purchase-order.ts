import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository';
import { PurchaseOrder } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetPurchaseOrderUseCaseRequest {
  purchaseOrderId?: string;
}

interface GetPurchaseOrderUseCaseResponse {
  purchase_order: PurchaseOrder;
}

export class GetPurchaseOrderUseCase {
  constructor(private purchaseOrderRepository: PurchaseOrdersRepository) {}

  async execute({
    purchaseOrderId,
  }: GetPurchaseOrderUseCaseRequest): Promise<GetPurchaseOrderUseCaseResponse> {
    const purchase_order = await this.purchaseOrderRepository.findById(
      purchaseOrderId,
    );

    if (!purchase_order) {
      throw new ResourceNotFoundError();
    }

    return {
      purchase_order,
    };
  }
}
