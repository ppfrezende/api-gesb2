import { prisma } from '@/lib/prisma';
import { Intervention, Prisma } from '@prisma/client';
import { InterventionsRepository } from '../interventions-respository';

export class PrismaInterventionsRepository implements InterventionsRepository {
  async findById(id: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findUnique({
      where: {
        id,
      },
      include: {
        employees: true,
        service_providers: true,
        purchase_order: true,
        site: true,
      },
    });

    return intervention;
  }

  async listMany(page: number) {
    const interventions = await prisma.intervention.findMany({
      take: 20,
      skip: (page - 1) * 20,
      include: {
        employees: true,
        service_providers: true,
        purchase_order: true,
        site: true,
      },
    });

    return interventions;
  }

  async searchMany(query: string, page: number) {
    const interventions = await prisma.intervention.findMany({
      where: {
        description: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        employees: true,
        service_providers: true,
        purchase_order: true,
        site: true,
      },
    });

    return interventions;
  }

  async create(data: Prisma.InterventionUncheckedCreateInput) {
    const intervention = await prisma.intervention.create({
      data,
    });

    return intervention;
  }

  async update(id: string, data: Prisma.InterventionUpdateInput) {
    const intervention = await prisma.intervention.update({
      where: {
        id,
      },
      data,
    });

    return intervention;
  }

  async delete(id: string) {
    await prisma.intervention.delete({
      where: {
        id,
      },
    });

    return;
  }
}
