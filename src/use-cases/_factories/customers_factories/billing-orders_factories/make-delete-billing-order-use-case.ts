import { PrismaBillingOrdersRepository } from '@/repositories/prisma/prisma-billing-order-respository';
import { DeleteBillingOrderUseCase } from '../../../customers/billing-orders/delete-billing-order';

export function makeDeleteBillingOrderUseCase() {
  const prismaBillingOrdersRepository = new PrismaBillingOrdersRepository();
  const useCase = new DeleteBillingOrderUseCase(prismaBillingOrdersRepository);

  return useCase;
}
