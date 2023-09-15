import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository';
import { Prisma, PurchaseOrder } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdatePurchaseOrdersUseCaseRequest {
  purchaseOrderId: string;
  data: Prisma.PurchaseOrderUpdateInput;
}

interface UpdatePurchaseOrdersUseCaseResponse {
  updatedPurchaseOrder: PurchaseOrder | null;
}

export class UpdatePurchaseOrdersUseCase {
  constructor(private purchaseOrderRepository: PurchaseOrdersRepository) {}

  async execute({
    purchaseOrderId,
    data,
  }: UpdatePurchaseOrdersUseCaseRequest): Promise<UpdatePurchaseOrdersUseCaseResponse> {
    const purchase_order = await this.purchaseOrderRepository.findById(
      purchaseOrderId,
    );

    if (!purchase_order) {
      throw new ResourceNotFoundError();
    }

    const updatedPurchaseOrder = await this.purchaseOrderRepository.update(
      purchaseOrderId,
      data,
    );

    return {
      updatedPurchaseOrder,
    };
  }
}
