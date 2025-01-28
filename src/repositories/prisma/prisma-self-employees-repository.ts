import { prisma } from '@/lib/prisma';
import { SelfEmployed, Prisma } from '@prisma/client';
import { SelfEmployeesRepository } from '../self-employees-repository';

export class PrismaSelfEmployeesRepository implements SelfEmployeesRepository {
  async findById(id: string): Promise<SelfEmployed | null> {
    const self_employed = await prisma.selfEmployed.findUnique({
      where: {
        id,
      },
    });

    return self_employed;
  }

  async findByEmail(email: string): Promise<SelfEmployed | null> {
    const self_employed = await prisma.selfEmployed.findFirst({
      where: {
        email,
        isDeleted: false,
      },
    });

    return self_employed;
  }

  async findByRegistrationNumber(
    registration_number: string,
  ): Promise<SelfEmployed | null> {
    const self_employed = await prisma.selfEmployed.findFirst({
      where: {
        registration_number,
        isDeleted: false,
      },
    });

    return self_employed;
  }

  async listMany(page: number) {
    const self_employees = await prisma.selfEmployed.findMany({
      where: {
        isDeleted: false,
        isActive: true,
      },
      take: 50,
      skip: (page - 1) * 50,
      orderBy: {
        created_at: 'desc',
      },
    });

    return self_employees;
  }

  async listManyInactive(page: number) {
    const self_employees = await prisma.selfEmployed.findMany({
      where: {
        isDeleted: false,
        isActive: false,
      },
      take: 50,
      skip: (page - 1) * 50,
      orderBy: {
        created_at: 'desc',
      },
    });

    return self_employees;
  }

  async listAll() {
    const self_employees = await prisma.selfEmployed.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return self_employees;
  }

  async listAllActive() {
    const self_employees = await prisma.selfEmployed.findMany({
      where: {
        isDeleted: false,
        isActive: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return self_employees;
  }

  async listAllInactive() {
    const self_employees = await prisma.selfEmployed.findMany({
      where: {
        isDeleted: false,
        isActive: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return self_employees;
  }

  async listAllSelfEmployedsTrash() {
    const self_employees = await prisma.selfEmployed.findMany({
      where: {
        isDeleted: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return self_employees;
  }

  async searchMany(query: string, page: number) {
    const self_employees = await prisma.selfEmployed.findMany({
      where: {
        isDeleted: false,
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            registration_number: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            document_number: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            job_title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            skills: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: 50,
      skip: (page - 1) * 50,
      orderBy: {
        created_at: 'desc',
      },
    });

    return self_employees;
  }

  async create(data: Prisma.SelfEmployedUncheckedCreateInput) {
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
    const self_employed = await prisma.selfEmployed.create({
      data: dataToCreate,
    });

    return self_employed;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.SelfEmployedUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const self_employed = await prisma.selfEmployed.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return self_employed;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.selfEmployed.update({
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
