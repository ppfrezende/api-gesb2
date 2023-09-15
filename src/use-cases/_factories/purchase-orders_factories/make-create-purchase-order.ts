import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-respository';
import { CreatePurchaseOrderUseCase } from '../../purchase-orders/create-purchase-order';

export function makeCreatePurchaseOrderUseCase() {
  const prismaPurchaseOrdersRepository = new PrismaPurchaseOrdersRepository();
  const useCase = new CreatePurchaseOrderUseCase(
    prismaPurchaseOrdersRepository,
  );

  return useCase;
}
