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
        invoicesToCustomer: true,
        Customer: {
          include: {
            project_managers: true,
          },
        },
        CustomerProjectManager: true,
        BillingOrder: true,
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
        interventionExpenses: {
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
    });

    return intervention;
  }

  async findByBillingOrder(
    billingOrderId?: string,
  ): Promise<Intervention | null> {
    const intervention = await prisma.intervention.findFirst({
      where: {
        billingOrderId,
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
      include: {
        Site: true,
        Technician: true,
        Customer: true,
        CustomerProjectManager: true,
        BillingOrder: true,
        timesheets: true,
        interventionExpenses: {
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
        initial_at: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
    });

    return totalAnualInterventionProfit._sum.total_value ?? 0;
  }

  async totalMonthlyInterventionsProfitValue(year: number, month: number) {
    const totalMonthInterventionProfit = await prisma.intervention.aggregate({
      _sum: {
        total_value: true,
      },
      where: {
        initial_at: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });

    return totalMonthInterventionProfit._sum.total_value ?? 0;
  }

  async totalMonthlyInterventionsCount(year: number, month: number) {
    const totalMonthInterventionCount = await prisma.intervention.count({
      where: {
        initial_at: {
          gte: new Date(year, month - 1, 1),
          lte: new Date(year, month, 1),
        },
      },
    });

    return totalMonthInterventionCount ?? 0;
  }

  async create(data: Prisma.InterventionUncheckedCreateInput) {
    const intervention = await prisma.intervention.create({
      data,
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

  async update(id: string, data: Prisma.InterventionUncheckedUpdateInput) {
    const intervention = await prisma.intervention.update({
      where: {
        id,
      },
      data,
    });

    return intervention;
  }

  async delete(id: string) {
    await prisma.interventionExpense.deleteMany({
      where: {
        interventionId: id,
      },
    });

    await prisma.invoiceToCustomer.deleteMany({
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
