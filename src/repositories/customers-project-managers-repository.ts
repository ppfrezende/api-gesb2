import { CustomerProjectManager, Prisma } from '@prisma/client';

export interface CustomerProjectManagersRepository {
  findById(id: string): Promise<CustomerProjectManager | null>;
  create(
    data: Prisma.CustomerProjectManagerUncheckedCreateInput,
  ): Promise<CustomerProjectManager>;
  update(
    id: string,
    data: Prisma.CustomerProjectManagerUpdateInput,
  ): Promise<CustomerProjectManager | null>;

  delete(id: string): Promise<void | null>;
}
