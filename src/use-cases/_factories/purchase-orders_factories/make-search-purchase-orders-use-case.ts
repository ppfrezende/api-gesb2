import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-respository';
import { SearchPurchaseOrdersUseCase } from '../../purchase-orders/search-purchase-order';

export function makeSearchPurchaseOrdersUseCase() {
  const prismaPurchaseOrdersRepository = new PrismaPurchaseOrdersRepository();
  const useCase = new SearchPurchaseOrdersUseCase(
    prismaPurchaseOrdersRepository,
  );

  return useCase;
}
