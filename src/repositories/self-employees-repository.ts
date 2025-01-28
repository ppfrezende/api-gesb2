import { SelfEmployed, Prisma } from '@prisma/client';

export interface SelfEmployeesRepository {
  findById(id: string): Promise<SelfEmployed | null>;
  findByEmail(email: string): Promise<SelfEmployed | null>;
  findByRegistrationNumber(
    registration_number: string,
  ): Promise<SelfEmployed | null>;
  listMany(page: number): Promise<SelfEmployed[]>;
  listManyInactive(page: number): Promise<SelfEmployed[]>;
  listAll(): Promise<SelfEmployed[]>;
  listAllActive(): Promise<SelfEmployed[]>;
  listAllInactive(): Promise<SelfEmployed[]>;
  listAllSelfEmployedsTrash(): Promise<SelfEmployed[]>;
  searchMany(query: string, page: number): Promise<SelfEmployed[]>;
  create(data: Prisma.SelfEmployedUncheckedCreateInput): Promise<SelfEmployed>;
  update(
    id: string,
    updatedBy: string,
    data: Prisma.SelfEmployedUpdateInput,
  ): Promise<SelfEmployed | null>;
  delete(id: string, deletedBy: string): Promise<void | null>;
}
