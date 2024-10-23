import { PrismaBillingOrdersRepository } from '@/repositories/prisma/prisma-billing-order-respository';
import { CreateBillingOrderUseCase } from '../../../customers/billing-orders/create-billing-order';

export function makeCreateBillingOrderUseCase() {
  const prismaBillingOrdersRepository = new PrismaBillingOrdersRepository();
  const useCase = new CreateBillingOrderUseCase(prismaBillingOrdersRepository);

  return useCase;
}
