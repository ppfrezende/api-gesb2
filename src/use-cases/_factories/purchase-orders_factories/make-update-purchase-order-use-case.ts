import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-respository';
import { UpdatePurchaseOrdersUseCase } from '../../purchase-orders/update-purchase-order';

export function makeUpdatePurchaseOrdersUseCase() {
  const prismaPurchaseOrdersRepository = new PrismaPurchaseOrdersRepository();
  const useCase = new UpdatePurchaseOrdersUseCase(
    prismaPurchaseOrdersRepository,
  );

  return useCase;
}
