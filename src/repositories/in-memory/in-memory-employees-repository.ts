import { Employees, Prisma } from '@prisma/client';
import { EmployeesRepository } from '../employees-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryEmployeesRepository implements EmployeesRepository {
  public items: Employees[] = [];

  async findById(id: string) {
    const employee = this.items.find((item) => item.id === id);

    if (!employee) {
      return null;
    }

    return employee;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  async create(data: Prisma.EmployeesCreateInput) {
    const employee = {
      id: randomUUID(),
      name: data.name,
      cpf: data.cpf,
      rg: data.rg,
      cnpj: data.cnpj,
      email: data.email,
      admission_at: new Date(),
      phone: data.phone,
      cep: data.cep,
      street: data.street,
      number: data.number,
      complement: data.complement,
      city: data.city,
      uf: data.uf,
      salary: data.salary,
      isCLT: data.isCLT,
    };

    this.items.push(employee);

    return employee;
  }
}
