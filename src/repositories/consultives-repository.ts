import { Consultive, Prisma } from '@prisma/client';

export interface ConsultivesRepository {
  findById(id: string | undefined): Promise<Consultive | null>;
  findByProgressive(progressive?: string): Promise<Consultive | null>;
  listMany(page: number): Promise<Consultive[]>;
  create(data: Prisma.ConsultiveUncheckedCreateInput): Promise<Consultive>;
  update(
    id: string,
    data: Prisma.ConsultiveUncheckedUpdateInput,
  ): Promise<Consultive | null>;
  delete(id: string): Promise<unknown>;
}
