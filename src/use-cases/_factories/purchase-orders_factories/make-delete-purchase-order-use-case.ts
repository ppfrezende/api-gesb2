import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-respository';
import { DeletePurchaseOrderUseCase } from '../../purchase-orders/delete-purchase-order';

export function makeDeletePurchaseOrderUseCase() {
  const prismaPurchaseOrdersRepository = new PrismaPurchaseOrdersRepository();
  const useCase = new DeletePurchaseOrderUseCase(
    prismaPurchaseOrdersRepository,
  );

  return useCase;
}
