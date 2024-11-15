import { Customer, Prisma } from '@prisma/client';

export interface CustomersRepository {
  findById(id: string): Promise<Customer | null>;
  listMany(page: number): Promise<Customer[]>;
  listAll(): Promise<Customer[]>;
  searchMany(query: string, page: number): Promise<Customer[]>;
  create(data: Prisma.CustomerUncheckedCreateInput): Promise<Customer>;
  update(
    id: string,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer | null>;
  delete(id: string): Promise<unknown | null>;
}
