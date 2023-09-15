import { Employee, Prisma } from '@prisma/client';

export interface EmployeesRepository {
  findById(id: string): Promise<Employee | null>;
  findByEmail(email: string): Promise<Employee | null>;
  findByCpf(cpf: string): Promise<Employee | null>;
  findByRg(rg: string): Promise<Employee | null>;
  listMany(page: number): Promise<Employee[]>;
  searchMany(query: string, page: number): Promise<Employee[]>;
  create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>;
  update(
    id: string,
    data: Prisma.EmployeeUpdateInput,
  ): Promise<Employee | null>;
  delete(id: string): Promise<void | null>;
}
