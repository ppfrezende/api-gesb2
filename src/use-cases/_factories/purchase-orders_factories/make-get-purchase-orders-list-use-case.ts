import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-respository';
import { GetPurchaseOrdersListUseCase } from '../../purchase-orders/get-purchase-orders-list';

export function makeGetPurchaseOrdersListUseCase() {
  const prismaPurchaseOrdersRepository = new PrismaPurchaseOrdersRepository();
  const useCase = new GetPurchaseOrdersListUseCase(
    prismaPurchaseOrdersRepository,
  );

  return useCase;
}
