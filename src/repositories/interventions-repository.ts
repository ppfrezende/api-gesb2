import { Intervention, Prisma } from '@prisma/client';

export interface InterventionsRepository {
  findById(id: string | undefined): Promise<Intervention | null>;
  findByProgressive(progressive?: string): Promise<Intervention | null>;
  listMany(page: number): Promise<Intervention[]>;
  create(data: Prisma.InterventionUncheckedCreateInput): Promise<Intervention>;
  update(
    id: string,
    data: Prisma.InterventionUncheckedUpdateInput,
  ): Promise<Intervention | null>;
  delete(id: string): Promise<unknown>;
}
