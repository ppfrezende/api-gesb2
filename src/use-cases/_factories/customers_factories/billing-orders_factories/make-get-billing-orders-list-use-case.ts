import { PrismaBillingOrdersRepository } from '@/repositories/prisma/prisma-billing-order-respository';
import { GetBillingOrdersListUseCase } from '../../../customers/billing-orders/get-billing-orders-list';

export function makeGetBillingOrdersListUseCase() {
  const prismaBillingOrdersRepository = new PrismaBillingOrdersRepository();
  const useCase = new GetBillingOrdersListUseCase(
    prismaBillingOrdersRepository,
  );

  return useCase;
}
