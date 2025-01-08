import { BillingOrdersRepository } from '@/repositories/billing-orders-repository';
import { Prisma, BillingOrder } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

interface UpdateBillingOrderUseCaseRequest {
  billingOrderId: string;
  updatedBy: string;
  data: Prisma.BillingOrderUpdateInput;
}

interface UpdateBillingOrderUseCaseResponse {
  updatedBillingOrder: BillingOrder | null;
}

export class UpdateBillingOrderUseCase {
  constructor(private billingOrderRepository: BillingOrdersRepository) {}

  async execute({
    billingOrderId,
    updatedBy,
    data,
  }: UpdateBillingOrderUseCaseRequest): Promise<UpdateBillingOrderUseCaseResponse> {
    const billing_order = await this.billingOrderRepository.findById(
      billingOrderId,
    );

    if (!billing_order) {
      throw new ResourceNotFoundError();
    }

    const updatedBillingOrder = await this.billingOrderRepository.update(
      billingOrderId,
      updatedBy,
      data,
    );

    return {
      updatedBillingOrder,
    };
  }
}
