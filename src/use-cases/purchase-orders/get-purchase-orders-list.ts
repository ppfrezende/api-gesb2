import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository';
import { PurchaseOrder } from '@prisma/client';

interface GetPurchaseOrdersListUseCaseRequest {
  page: number;
}

interface GetPurchaseOrdersListUseCaseResponse {
  numberOfRegisters: string;
  purchase_orders: PurchaseOrder[];
}

export class GetPurchaseOrdersListUseCase {
  constructor(private purchaseOrderRepository: PurchaseOrdersRepository) {}

  async execute({
    page,
  }: GetPurchaseOrdersListUseCaseRequest): Promise<GetPurchaseOrdersListUseCaseResponse> {
    const purchase_orders = await this.purchaseOrderRepository.listMany(page);

    purchase_orders.map((purchase_order) => {
      return purchase_order;
    });

    const numberOfRegisters = purchase_orders.length.toString();

    return {
      numberOfRegisters,
      purchase_orders,
    };
  }
}
