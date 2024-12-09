import { CustomerProjectManager, Prisma } from '@prisma/client';

export interface CustomerProjectManagersRepository {
  findById(id: string): Promise<CustomerProjectManager | null>;
  listAllCustomerProjectManagersTrash(): Promise<CustomerProjectManager[]>;
  create(
    data: Prisma.CustomerProjectManagerUncheckedCreateInput,
  ): Promise<CustomerProjectManager>;
  update(
    id: string,
    data: Prisma.CustomerProjectManagerUpdateInput,
  ): Promise<CustomerProjectManager | null>;

  delete(id: string, deletedBy: string): Promise<void | null>;
}
