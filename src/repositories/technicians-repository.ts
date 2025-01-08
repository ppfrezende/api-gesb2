import { Technician, Prisma } from '@prisma/client';

export interface TechniciansRepository {
  findById(id: string): Promise<Technician | null>;
  findByEmail(email: string): Promise<Technician | null>;
  findByRegistrationNumber(
    registration_number: string,
  ): Promise<Technician | null>;
  listMany(page: number): Promise<Technician[]>;
  listAll(): Promise<Technician[]>;
  searchMany(query: string, page: number): Promise<Technician[]>;
  create(data: Prisma.TechnicianUncheckedCreateInput): Promise<Technician>;
  update(
    id: string,
    updatedBy: string,
    data: Prisma.TechnicianUpdateInput,
  ): Promise<Technician | null>;
  delete(id: string, deletedBy: string): Promise<void | null>;
}
