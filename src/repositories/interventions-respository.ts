import { Intervention, Prisma } from '@prisma/client';

export interface InterventionsRepository {
  findById(id: string): Promise<Intervention | null>;
  listMany(page: number): Promise<Intervention[]>;
  searchMany(query: string, page: number): Promise<Intervention[]>;
  create(data: Prisma.InterventionUncheckedCreateInput): Promise<Intervention>;
  update(
    id: string,
    data: Prisma.InterventionUpdateInput,
  ): Promise<Intervention | null>;
  delete(id: string): Promise<unknown>;
}
