import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository';
import { PurchaseOrder } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface CreatePurchaseOrderUseCaseRequest {
  name: string;
  description: string;
  factor_HE_onshore: number;
  factor_HE_offshore: number;
  factor_HN_onshore: number;
  factor_HN_offshore: number;
  factor_holiday: number;
  factor_night: number;
  factor_over_xd: number;
  time_onshore: number;
  time_offshore: number;
  time_travel: number;
  isMonthly: boolean;
  whatsCalendar: number;
  currency: string;
  adictional: number;
  userName: string;
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
    factor_HN_onshore,
    factor_HN_offshore,
    factor_holiday,
    factor_night,
    factor_over_xd,
    time_onshore,
    time_offshore,
    time_travel,
    isMonthly,
    whatsCalendar,
    currency,
    adictional,
    userName,
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
      factor_HN_onshore,
      factor_HN_offshore,
      factor_holiday,
      factor_night,
      factor_over_xd,
      time_onshore,
      time_offshore,
      time_travel,
      isMonthly,
      whatsCalendar,
      currency,
      adictional,
      userName,
    });

    return {
      purchase_order,
    };
  }
}
