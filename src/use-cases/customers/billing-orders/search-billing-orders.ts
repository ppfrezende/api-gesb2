import { BillingOrdersRepository } from '@/repositories/billing-orders-repository';
import { BillingOrder } from '@prisma/client';

interface SearchBillingOrdersUseCaseRequest {
  query: string;
  page: number;
}

interface SearchBillingOrdersUseCaseResponse {
  billing_orders: BillingOrder[];
  numberOfRegisters: string;
}

export class SearchBillingOrdersUseCase {
  constructor(private billingOrdersRepository: BillingOrdersRepository) {}

  async execute({
    query,
    page,
  }: SearchBillingOrdersUseCaseRequest): Promise<SearchBillingOrdersUseCaseResponse> {
    const billing_orders = await this.billingOrdersRepository.searchMany(
      query,
      page,
    );

    const numberOfRegisters = billing_orders.length.toString();

    return {
      numberOfRegisters,
      billing_orders,
    };
  }
}
