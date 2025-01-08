import { prisma } from '@/lib/prisma';
import { Technician, Prisma } from '@prisma/client';
import { TechniciansRepository } from '../technicians-repository';

export class PrismaTechniciansRepository implements TechniciansRepository {
  async findById(id: string): Promise<Technician | null> {
    const technician = await prisma.technician.findUnique({
      where: {
        id,
      },
      include: {
        interventions: true,
        timesheetdata: {
          where: {
            isDeleted: false,
          },
          orderBy: {
            first_date: 'asc',
          },
        },
        technicianExpenses: {
          where: {
            isDeleted: false,
          },
          orderBy: {
            expense_date: 'desc',
          },
        },
      },
    });

    return technician;
  }
  async findByEmail(email: string): Promise<Technician | null> {
    const technician = await prisma.technician.findFirst({
      where: {
        email,
        isDeleted: false,
      },
    });

    return technician;
  }

  async findByRegistrationNumber(
    registration_number: string,
  ): Promise<Technician | null> {
    const technician = await prisma.technician.findFirst({
      where: {
        registration_number,
        isDeleted: false,
      },
    });

    return technician;
  }

  async listMany(page: number) {
    const technicians = await prisma.technician.findMany({
      where: {
        isDeleted: false,
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return technicians;
  }

  async listAll() {
    const technicians = await prisma.technician.findMany({
      where: {
        isDeleted: false,
      },
    });

    return technicians;
  }

  async searchMany(query: string, page: number) {
    const technicians = await prisma.technician.findMany({
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
            email: {
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
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return technicians;
  }

  async create(data: Prisma.TechnicianUncheckedCreateInput) {
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
    const technician = await prisma.technician.create({
      data: dataToCreate,
    });

    return technician;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.TechnicianUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const technician = await prisma.technician.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return technician;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.technicianExpense.updateMany({
      where: {
        technicianId: id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    await prisma.technician.update({
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
