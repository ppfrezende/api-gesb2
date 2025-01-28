import { Intervention, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export interface InterventionsRepository {
  findById(id: string | undefined): Promise<Intervention | null>;
  findByProgressive(progressive?: string): Promise<Intervention | null>;
  findByBillingOrder(billingOrderId?: string): Promise<Intervention | null>;
  findByCustomer(customerId?: string): Promise<Intervention | null>;
  findByCustomerProjectManager(
    customerProjectManagerId?: string,
  ): Promise<Intervention | null>;
  findBySite(siteId?: string): Promise<Intervention | null>;
  findByTech(technicianId?: string): Promise<Intervention | null>;
  listMany(page: number): Promise<Intervention[]>;
  listAll(): Promise<Intervention[]>;
  listAllInterventionsTrash(): Promise<Intervention[]>;
  searchMany(query: string, page: number): Promise<Intervention[]>;
  totalAnualInterventionsProfitValue(
    year: number,
  ): Promise<{ USD: number; EUR: number; BRL: number }>;
  expectedAnualInterventionsProfitValue(
    year: number,
  ): Promise<{ USD: number; EUR: number; BRL: number }>;
  totalMonthlyInterventionsProfitValue(
    year: number,
    month: number,
  ): Promise<Decimal | 0>;
  totalMonthlyInterventionsCount(year: number, month: number): Promise<number>;
  create(data: Prisma.InterventionUncheckedCreateInput): Promise<Intervention>;
  update(
    id: string,
    updatedBy: string,
    data: Prisma.InterventionUncheckedUpdateInput,
  ): Promise<Intervention | null>;
  delete(id: string, deletedBy: string): Promise<unknown>;
}
