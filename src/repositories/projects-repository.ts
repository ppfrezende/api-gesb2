import { Project, Prisma } from '@prisma/client';

export interface ProjectsRepository {
  findById(id: string): Promise<Project | null>;
  findByPurchaseOrder(purchase_order: string): Promise<Project | null>;
  listMany(page: number): Promise<Project[]>;
  searchMany(query: string, page: number): Promise<Project[]>;
  create(data: Prisma.ProjectUncheckedCreateInput): Promise<Project>;
  update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project | null>;
  delete(id: string): Promise<void | null>;
}
