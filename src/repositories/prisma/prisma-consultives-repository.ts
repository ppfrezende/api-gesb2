import { prisma } from '@/lib/prisma';
import { Consultive, Prisma } from '@prisma/client';
import { ConsultivesRepository } from '../consultives-repository';

export class PrismaConsultivesRepository implements ConsultivesRepository {
  async findById(id: string): Promise<Consultive | null> {
    const consultive = await prisma.consultive.findUnique({
      where: {
        id,
      },
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        PurchaseOrder: true,
      },
    });

    return consultive;
  }

  async findByProgressive(progressive?: string): Promise<Consultive | null> {
    const consultive = await prisma.consultive.findUnique({
      where: {
        progressive,
      },
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        PurchaseOrder: true,
      },
    });

    return consultive;
  }

  async listMany(page: number) {
    const consultives = await prisma.consultive.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        PurchaseOrder: true,
      },
      orderBy: {
        progressive: 'desc',
      },
    });

    return consultives;
  }

  async create(data: Prisma.ConsultiveUncheckedCreateInput) {
    const consultive = await prisma.consultive.create({
      data,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        PurchaseOrder: true,
      },
    });

    return consultive;
  }

  async update(id: string, data: Prisma.ConsultiveUncheckedUpdateInput) {
    const consultive = await prisma.consultive.update({
      where: {
        id,
      },
      data,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        PurchaseOrder: true,
      },
    });

    return consultive;
  }

  async delete(id: string) {
    await prisma.consultive.delete({
      where: {
        id,
      },
    });

    return;
  }
}
