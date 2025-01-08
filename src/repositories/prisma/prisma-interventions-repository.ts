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
            project_managers: {
              where: {
                isDeleted: false,
              },
            },
          },
        },
        CustomerProjectManager: true,
        BillingOrder: true,
        timesheets: {
          where: {
            isDeleted: false,
          },
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
        interventionExpenses: {
          where: {
            isDeleted: false,
          },
          orderBy: {
            expense_date: 'asc',
          },
        },
      },
    });

    return intervention;
  }

  async findByProgressive(progressive?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        progressive,
        isDeleted: false,
      },
    });

    return intervention;
  }

  async findByBillingOrder(
    billingOrderId?: string,
  ): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        billingOrderId,
        isDeleted: false,
      },
    });

    return intervention;
  }

  async findByCustomer(customerId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        customerId,
        isDeleted: false,
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
        isDeleted: false,
      },
    });

    return intervention;
  }

  async findBySite(siteId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        siteId,
        isDeleted: false,
      },
    });

    return intervention;
  }

  async findByTech(technicianId?: string): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        technicianId,
        isDeleted: false,
      },
    });

    return intervention;
  }

  async listMany(page: number) {
    const interventions = await prisma.intervention.findMany({
      where: {
        isDeleted: false,
      },
      take: 10,
      skip: (page - 1) * 10,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        BillingOrder: true,
        timesheets: true,
        interventionExpenses: {
          where: {
            isDeleted: false,
          },
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

  async listAll() {
    const interventions = await prisma.intervention.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        BillingOrder: true,
        timesheets: true,
        interventionExpenses: {
          where: {
            isDeleted: false,
          },
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
  async listAllInterventionsTrash() {
    const interventions = await prisma.intervention.findMany({
      where: {
        isDeleted: true,
      },
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        BillingOrder: true,
        timesheets: true,
        interventionExpenses: {
          where: {
            isDeleted: true,
          },
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

  async searchMany(query: string, page: number) {
    const interventions = await prisma.intervention.findMany({
      where: {
        isDeleted: false,

        OR: [
          {
            progressive: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            intervention_number: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            customer_po_number: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            Technician: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            Customer: {
              company_name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            CustomerProjectManager: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            BillingOrder: {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      take: 10,
      skip: (page - 1) * 10,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        BillingOrder: true,
        timesheets: true,
        interventionExpenses: {
          where: {
            isDeleted: false,
          },
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

  async totalAnualInterventionsProfitValue(year: number) {
    const totalAnualInterventionProfit = await prisma.intervention.aggregate({
      _sum: {
        total_value: true,
      },
      where: {
        isApproved: true,
        isDeleted: false,
        finished_at: {
          gte: new Date(Date.UTC(year, 0, 1)),
          lt: new Date(Date.UTC(year + 1, 0, 1)),
        },
      },
    });

    return totalAnualInterventionProfit._sum.total_value ?? 0;
  }

  async expectedAnualInterventionsProfitValue(year: number) {
    const expectedAnualInterventionsProfit =
      await prisma.intervention.aggregate({
        _sum: {
          total_value: true,
        },
        where: {
          isApproved: false,
          isDeleted: false,
          finished_at: {
            gte: new Date(Date.UTC(year, 0, 1)),
            lt: new Date(Date.UTC(year + 1, 0, 1)),
          },
        },
      });

    return expectedAnualInterventionsProfit._sum.total_value ?? 0;
  }

  async totalMonthlyInterventionsProfitValue(year: number, month: number) {
    const startOfMonth =
      month === 0
        ? new Date(Date.UTC(year, month, 1))
        : new Date(Date.UTC(year, month, 1));
    const endOfMonth =
      month === 0
        ? new Date(Date.UTC(year, month + 1, 0))
        : new Date(Date.UTC(year, month + 1, 0));
    const totalMonthInterventionProfit = await prisma.intervention.aggregate({
      _sum: {
        total_value: true,
      },
      where: {
        isApproved: true,
        isDeleted: false,
        initial_at: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return totalMonthInterventionProfit._sum.total_value ?? 0;
  }

  async totalMonthlyInterventionsCount(year: number, month: number) {
    const startOfMonth =
      month === 0
        ? new Date(Date.UTC(year, month, 1))
        : new Date(Date.UTC(year, month, 1));
    const endOfMonth =
      month === 0
        ? new Date(Date.UTC(year, month + 1, 0))
        : new Date(Date.UTC(year, month + 1, 0));
    const totalMonthInterventionCount = await prisma.intervention.count({
      where: {
        isDeleted: false,
        initial_at: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return totalMonthInterventionCount ?? 0;
  }

  async create(data: Prisma.InterventionUncheckedCreateInput) {
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
    const intervention = await prisma.intervention.create({
      data: dataToCreate,
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        BillingOrder: true,
      },
    });

    return intervention;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.InterventionUncheckedUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const intervention = await prisma.intervention.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return intervention;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.interventionExpense.updateMany({
      where: {
        interventionId: id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    await prisma.intervention.update({
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
