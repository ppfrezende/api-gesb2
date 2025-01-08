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
    const employee = await prisma.employee.findFirst({
      where: {
        email,
        isDeleted: false,
      },
    });

    return employee;
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employee = await prisma.employee.findFirst({
      where: {
        cpf,
        isDeleted: false,
      },
    });

    return employee;
  }

  async findByRegistrationNumber(
    registration_number: string,
  ): Promise<Employee | null> {
    const employee = await prisma.employee.findFirst({
      where: {
        registration_number,
        isDeleted: false,
      },
    });

    return employee;
  }

  async listMany(page: number) {
    const employees = await prisma.employee.findMany({
      where: {
        isDeleted: false,
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return employees;
  }

  async listAll() {
    const employees = await prisma.employee.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return employees;
  }

  async listAllEmployeesTrash() {
    const employees = await prisma.employee.findMany({
      where: {
        isDeleted: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return employees;
  }

  async searchMany(query: string, page: number) {
    const employees = await prisma.employee.findMany({
      where: {
        isDeleted: false,
        name: {
          contains: query,
        },
        email: {
          contains: query,
        },
        cpf: {
          contains: query,
        },
        job_title: {
          contains: query,
        },
        skills: {
          contains: query,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return employees;
  }

  async create(data: Prisma.EmployeeUncheckedCreateInput) {
    const now = new Date();
    const createdAtUTC = new Date(
      Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      ),
    ).toISOString();

    const dataToCreate = {
      ...data,
      created_at: createdAtUTC,
    };
    const employee = await prisma.employee.create({
      data: dataToCreate,
    });

    return employee;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.EmployeeUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return employee;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.employee.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    return;
  }
}
