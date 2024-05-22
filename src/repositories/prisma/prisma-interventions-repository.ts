import { prisma } from '@/lib/prisma';
import { Intervention, Prisma } from '@prisma/client';
import { InterventionsRepository } from '../interventions-repository';

export class PrismaInterventionsRepository implements InterventionsRepository {
  async findById(id: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findUnique({
      where: {
        id,
      },
      include: {
        Site: true,
        Technician: true,
        Customer: {
          include: {
            project_managers: true,
          },
        },
        CustomerProjectManager: true,
        PurchaseOrder: {
          include: {
            skills: true,
          },
        },
        Skill: true,
        timesheets: {
          include: {
            timesheetdays: {
              orderBy: {
                day: 'asc',
              },
            },
          },
          orderBy: {
            created_at: 'asc',
          },
        },
        expenses: {
          orderBy: {
            expense_date: 'asc',
          },
        },
      },
    });

    return intervention;
  }

  async findByProgressive(progressive?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findUnique({
      where: {
        progressive,
      },
      include: {
        Site: true,
        Technician: true,
        Customer: {
          include: {
            project_managers: true,
          },
        },
        CustomerProjectManager: true,
        PurchaseOrder: {
          include: {
            skills: true,
          },
        },
        Skill: true,
        timesheets: {
          include: {
            timesheetdays: {
              orderBy: {
                day: 'asc',
              },
            },
          },
        },
        expenses: {
          orderBy: {
            expense_date: 'asc',
          },
        },
      },
    });

    return intervention;
  }

  async findByPO(purchaseOrderId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        purchaseOrderId,
      },
    });

    return intervention;
  }

  async findBySkill(skillId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        skillId,
      },
    });

    return intervention;
  }

  async findByCustomer(customerId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        customerId,
      },
    });

    return intervention;
  }

  async findByCustomerProjectManager(
    customerProjectManagerId?: string,
  ): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        customerProjectManagerId,
      },
    });

    return intervention;
  }

  async findBySite(siteId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        siteId,
      },
    });

    return intervention;
  }

  async findByTech(technicianId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        technicianId,
      },
    });

    return intervention;
  }

  async listMany(page: number) {
    const interventions = await prisma.intervention.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Site: true,
        Technician: true,
        Customer: {
          include: {
            project_managers: true,
          },
        },
        CustomerProjectManager: true,
        PurchaseOrder: {
          include: {
            skills: true,
          },
        },
        Skill: true,
        timesheets: true,
        expenses: {
          orderBy: {
            expense_date: 'asc',
          },
        },
      },
      orderBy: {
        progressive: 'desc',
      },
    });

    return interventions;
  }

  async create(data: Prisma.InterventionUncheckedCreateInput) {
    const intervention = await prisma.intervention.create({
      data,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        PurchaseOrder: {
          include: {
            skills: true,
          },
        },
        Skill: true,
      },
    });

    return intervention;
  }

  async update(id: string, data: Prisma.InterventionUncheckedUpdateInput) {
    const intervention = await prisma.intervention.update({
      where: {
        id,
      },
      data,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        PurchaseOrder: {
          include: {
            skills: true,
          },
        },
        Skill: true,
      },
    });

    return intervention;
  }

  async delete(id: string) {
    await prisma.expense.deleteMany({
      where: {
        interventionId: id,
      },
    });

    await prisma.intervention.delete({
      where: {
        id,
      },
    });

    return;
  }
}
