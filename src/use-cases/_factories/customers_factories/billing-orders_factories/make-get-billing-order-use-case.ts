import { PrismaBillingOrdersRepository } from '@/repositories/prisma/prisma-billing-order-respository';
import { GetBillingOrderUseCase } from '../../../customers/billing-orders/get-billing-order';

export function makeGetBillingOrderUseCase() {
  const prismaBillingOrdersRepository = new PrismaBillingOrdersRepository();
  const useCase = new GetBillingOrderUseCase(prismaBillingOrdersRepository);

  return useCase;
}
