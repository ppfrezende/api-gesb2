import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository';
import { PurchaseOrder } from '@prisma/client';

interface SearchPurchaseOrdersUseCaseRequest {
  query: string;
  page: number;
}

interface SearchPurchaseOrdersUseCaseResponse {
  purchase_orders: PurchaseOrder[];
}

export class SearchPurchaseOrdersUseCase {
  constructor(private purchaseOrderRepository: PurchaseOrdersRepository) {}

  async execute({
    query,
    page,
  }: SearchPurchaseOrdersUseCaseRequest): Promise<SearchPurchaseOrdersUseCaseResponse> {
    const purchase_orders = await this.purchaseOrderRepository.searchMany(
      query,
      page,
    );

    return {
      purchase_orders,
    };
  }
}
