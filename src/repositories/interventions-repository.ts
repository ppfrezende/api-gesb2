import { Intervention, Prisma } from '@prisma/client';

export interface InterventionsRepository {
  findById(id: string | undefined): Promise<Intervention | null>;
  findByProgressive(progressive?: string): Promise<Intervention | null>;
  findByPO(purchaseOrderId?: string): Promise<Intervention | null>;
  findBySkill(skillId?: string): Promise<Intervention | null>;
  findByCustomer(customerId?: string): Promise<Intervention | null>;
  findByCustomerProjectManager(
    customerProjectManagerId?: string,
  ): Promise<Intervention | null>;
  findBySite(siteId?: string): Promise<Intervention | null>;
  findByTech(technicianId?: string): Promise<Intervention | null>;
  listMany(page: number): Promise<Intervention[]>;
  create(data: Prisma.InterventionUncheckedCreateInput): Promise<Intervention>;
  update(
    id: string,
    data: Prisma.InterventionUncheckedUpdateInput,
  ): Promise<Intervention | null>;
  delete(id: string): Promise<unknown>;
}
