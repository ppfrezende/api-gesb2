import { BillingOrder, Prisma } from '@prisma/client';

export interface BillingOrdersRepository {
  findById(id: string | undefined): Promise<BillingOrder | null>;
  listMany(page: number): Promise<BillingOrder[]>;
  listAllBillingOrdersTrash(): Promise<BillingOrder[]>;
  searchMany(query: string, page: number): Promise<BillingOrder[]>;
  create(data: Prisma.BillingOrderUncheckedCreateInput): Promise<BillingOrder>;
  update(
    id: string,
    data: Prisma.BillingOrderUpdateInput,
  ): Promise<BillingOrder | null>;
  delete(id: string, deletedBy: string): Promise<unknown>;
}
