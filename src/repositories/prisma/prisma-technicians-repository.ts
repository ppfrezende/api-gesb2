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
          orderBy: {
            first_date: 'asc',
          },
        },
        expenses: {
          orderBy: {
            expense_date: 'desc',
          },
        },
      },
    });

    return technician;
  }
  async findByEmail(email: string): Promise<Technician | null> {
    const technician = await prisma.technician.findUnique({
      where: {
        email,
      },
    });

    return technician;
  }

  async listMany(page: number) {
    const technicians = await prisma.technician.findMany({
      take: 100,
      skip: (page - 1) * 100,
      orderBy: {
        created_at: 'desc',
      },
    });

    return technicians;
  }

  async searchMany(query: string, page: number) {
    const technicians = await prisma.technician.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 100,
      skip: (page - 1) * 100,
    });

    return technicians;
  }

  async create(data: Prisma.TechnicianUncheckedCreateInput) {
    const technician = await prisma.technician.create({
      data,
    });

    return technician;
  }

  async update(id: string, data: Prisma.TechnicianUpdateInput) {
    const technician = await prisma.technician.update({
      where: {
        id,
      },
      data,
    });

    return technician;
  }

  async delete(id: string) {
    await prisma.technician.delete({
      where: {
        id,
      },
    });

    return;
  }
}
