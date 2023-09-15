import { prisma } from '@/lib/prisma';
import { Employee, Prisma } from '@prisma/client';
import { EmployeesRepository } from '../employees-repository';

export class PrismaEmployeesRepository implements EmployeesRepository {
  async findById(id: string): Promise<Employee | null> {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    return employee;
  }
  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await prisma.employee.findUnique({
      where: {
        email,
      },
    });

    return employee;
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employee = await prisma.employee.findUnique({
      where: {
        cpf,
      },
    });

    return employee;
  }

  async findByRg(rg: string): Promise<Employee | null> {
    const employee = await prisma.employee.findUnique({
      where: {
        rg,
      },
    });

    return employee;
  }

  async listMany(page: number) {
    const employees = await prisma.employee.findMany({
      take: 20,
      skip: (page - 1) * 20,
    });

    return employees;
  }

  async searchMany(query: string, page: number) {
    const employees = await prisma.employee.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return employees;
  }

  async create(data: Prisma.EmployeeUncheckedCreateInput) {
    const employee = await prisma.employee.create({
      data,
    });

    return employee;
  }

  async update(id: string, data: Prisma.EmployeeUpdateInput) {
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    return employee;
  }
  async delete(id: string) {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    return;
  }
}
