import { BillingOrdersRepository } from '@/repositories/billing-orders-repository';
import { BillingOrder } from '@prisma/client';

interface GetBillingOrdersTrashListUseCaseResponse {
  numberOfRegisters: string;
  billing_orders: BillingOrder[];
}

export class GetBillingOrdersTrashListUseCase {
  constructor(private billingOrderRepository: BillingOrdersRepository) {}

  async execute(): Promise<GetBillingOrdersTrashListUseCaseResponse> {
    const billing_orders =
      await this.billingOrderRepository.listAllBillingOrdersTrash();

    const numberOfRegisters = billing_orders.length.toString();

    return {
      numberOfRegisters,
      billing_orders,
    };
  }
}
