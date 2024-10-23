import { PrismaBillingOrdersRepository } from '@/repositories/prisma/prisma-billing-order-respository';
import { UpdateBillingOrderUseCase } from '../../../customers/billing-orders/update-billing-order';

export function makeUpdateBillingOrderUseCase() {
  const prismaBillingOrdersRepository = new PrismaBillingOrdersRepository();
  const useCase = new UpdateBillingOrderUseCase(prismaBillingOrdersRepository);

  return useCase;
}
