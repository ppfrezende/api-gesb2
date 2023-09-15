import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-respository';
import { GetPurchaseOrderUseCase } from '../../purchase-orders/get-purchase-order';

export function makeGetPurchaseOrderUseCase() {
  const prismaPurchaseOrdersRepository = new PrismaPurchaseOrdersRepository();
  const useCase = new GetPurchaseOrderUseCase(prismaPurchaseOrdersRepository);

  return useCase;
}
