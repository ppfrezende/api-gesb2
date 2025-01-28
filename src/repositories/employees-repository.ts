import { Employee, Prisma } from '@prisma/client';

export interface EmployeesRepository {
  findById(id: string): Promise<Employee | null>;
  findByEmail(email: string): Promise<Employee | null>;
  findByCpf(cpf: string): Promise<Employee | null>;
  findByRegistrationNumber(
    registration_number: string,
  ): Promise<Employee | null>;
  listMany(page: number): Promise<Employee[]>;
  listManyInactive(page: number): Promise<Employee[]>;
  listAll(): Promise<Employee[]>;
  listAllActive(): Promise<Employee[]>;
  listAllInactive(): Promise<Employee[]>;
  listAllEmployeesTrash(): Promise<Employee[]>;
  searchMany(query: string, page: number): Promise<Employee[]>;
  create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>;
  update(
    id: string,
    updatedBy: string,
    data: Prisma.EmployeeUpdateInput,
  ): Promise<Employee | null>;
  delete(id: string, deletedBy: string): Promise<void | null>;
}
