import { BillingOrdersRepository } from '@/repositories/billing-orders-repository';
import { BillingOrder } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

interface GetBillingOrderUseCaseRequest {
  billingOrderId?: string;
}

interface GetBillingOrderUseCaseResponse {
  billing_order: BillingOrder;
}

export class GetBillingOrderUseCase {
  constructor(private billingOrderRepository: BillingOrdersRepository) {}

  async execute({
    billingOrderId,
  }: GetBillingOrderUseCaseRequest): Promise<GetBillingOrderUseCaseResponse> {
    const billing_order = await this.billingOrderRepository.findById(
      billingOrderId,
    );

    if (!billing_order) {
      throw new ResourceNotFoundError();
    }

    return {
      billing_order,
    };
  }
}
