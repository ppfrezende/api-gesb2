import { PrismaBillingOrdersRepository } from '@/repositories/prisma/prisma-billing-order-respository';
import { SearchBillingOrdersUseCase } from '../../../customers/billing-orders/search-billing-orders';

export function makeSearchBillingOrdersUseCase() {
  const prismaBillingOrdersRepository = new PrismaBillingOrdersRepository();
  const useCase = new SearchBillingOrdersUseCase(prismaBillingOrdersRepository);

  return useCase;
}
