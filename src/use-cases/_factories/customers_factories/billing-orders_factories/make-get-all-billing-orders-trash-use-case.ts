import { PrismaBillingOrdersRepository } from '@/repositories/prisma/prisma-billing-order-respository';
import { GetBillingOrdersTrashListUseCase } from '../../../customers/billing-orders/get-all-billing-orders-trash';

export function makeGetBillingOrdersTrashListUseCase() {
  const prismaBillingOrdersRepository = new PrismaBillingOrdersRepository();
  const useCase = new GetBillingOrdersTrashListUseCase(
    prismaBillingOrdersRepository,
  );

  return useCase;
}
