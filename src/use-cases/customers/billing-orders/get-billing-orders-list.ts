import { BillingOrdersRepository } from '@/repositories/billing-orders-repository';
import { BillingOrder } from '@prisma/client';

interface GetBillingOrdersListUseCaseRequest {
  page: number;
}

interface GetBillingOrdersListUseCaseResponse {
  numberOfRegisters: string;
  billing_orders: BillingOrder[];
}

export class GetBillingOrdersListUseCase {
  constructor(private billingOrderRepository: BillingOrdersRepository) {}

  async execute({
    page,
  }: GetBillingOrdersListUseCaseRequest): Promise<GetBillingOrdersListUseCaseResponse> {
    const billing_orders = await this.billingOrderRepository.listMany(page);

    const numberOfRegisters = billing_orders.length.toString();

    return {
      numberOfRegisters,
      billing_orders,
    };
  }
}
