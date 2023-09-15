import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository';
import { PurchaseOrder } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface CreatePurchaseOrderUseCaseRequest {
  name: string;
  description: string;
  factor_HE_onshore: number;
  factor_HE_offshore: number;
  factor_HN: number;
  day_H_before_extra_onshore: number;
  day_H_before_extra_offshore: number;
  userEmail: string;
}

interface CreatePurchaseOrderUseCaseResponse {
  purchase_order: PurchaseOrder;
}

export class CreatePurchaseOrderUseCase {
  constructor(private purchaseOrderRepository: PurchaseOrdersRepository) {}

  async execute({
    name,
    description,
    factor_HE_onshore,
    factor_HE_offshore,
    factor_HN,
    day_H_before_extra_onshore,
    day_H_before_extra_offshore,
    userEmail,
  }: CreatePurchaseOrderUseCaseRequest): Promise<CreatePurchaseOrderUseCaseResponse> {
    const purchaseWithSameName = await this.purchaseOrderRepository.findByName(
      name,
    );

    if (purchaseWithSameName) {
      throw new ResourceAlreadyExists();
    }

    const purchase_order = await this.purchaseOrderRepository.create({
      name,
      description,
      factor_HE_onshore,
      factor_HE_offshore,
      factor_HN,
      day_H_before_extra_onshore,
      day_H_before_extra_offshore,
      userEmail,
    });

    return {
      purchase_order,
    };
  }
}
