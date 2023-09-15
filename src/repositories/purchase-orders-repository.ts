import { PurchaseOrder, Prisma } from '@prisma/client';

export interface PurchaseOrdersRepository {
  findById(id: string | undefined): Promise<PurchaseOrder | null>;
  findByName(name?: string): Promise<PurchaseOrder | null>;
  listMany(page: number): Promise<PurchaseOrder[]>;
  searchMany(query: string, page: number): Promise<PurchaseOrder[]>;
  create(
    data: Prisma.PurchaseOrderUncheckedCreateInput,
  ): Promise<PurchaseOrder>;
  update(
    id: string,
    data: Prisma.PurchaseOrderUpdateInput,
  ): Promise<PurchaseOrder | null>;
  delete(id: string): Promise<unknown>;
}
