import { Site, Prisma } from '@prisma/client';

export interface SitesRepository {
  findById(id: string): Promise<Site | null>;
  listMany(page: number): Promise<Site[]>;
  listAll(): Promise<Site[]>;
  searchMany(query: string, page: number): Promise<Site[]>;
  create(data: Prisma.SiteUncheckedCreateInput): Promise<Site>;
  update(id: string, data: Prisma.SiteUpdateInput): Promise<Site | null>;
  delete(id: string): Promise<void | null>;
}
