import { prisma } from '@/lib/prisma';
import { TechnicianExpense, Prisma } from '@prisma/client';
import { TechnicianExpensesRepository } from '../technician-expenses-repository';

export class PrismaTechnicianExpensesRepository
  implements TechnicianExpensesRepository
{
  async findById(id: string): Promise<TechnicianExpense | null> {
    const technicianExpense = await prisma.technicianExpense.findUnique({
      where: {
        id,
      },
    });

    return technicianExpense;
  }

  async listManyByTechnicianId(technicianId: string, page: number) {
    const expenses = await prisma.technicianExpense.findMany({
      where: {
        technicianId,
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Technician: true,
      },
      orderBy: {
        expense_date: 'desc',
      },
    });

    return expenses;
  }

  async listMany(page: number) {
    const technicianExpenses = await prisma.technicianExpense.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Technician: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return technicianExpenses;
  }

  async totalAnualTechniciansExpensesValue(year: number) {
    const totalAnualTechniciansExpenses =
      await prisma.technicianExpense.aggregate({
        _sum: {
          expense_value: true,
        },
        where: {
          expense_date: {
            gte: new Date(year, 0, 1),
            lt: new Date(year + 1, 0, 1),
          },
        },
      });

    return totalAnualTechniciansExpenses._sum.expense_value ?? 0;
  }

  async totalMonthlyTechniciansExpensesValue(year: number, month: number) {
    const totalMonthTechniciansExpenses =
      await prisma.technicianExpense.aggregate({
        _sum: {
          expense_value: true,
        },
        where: {
          expense_date: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      });

    return totalMonthTechniciansExpenses._sum.expense_value ?? 0;
  }

  async createMany(data: Prisma.TechnicianExpenseCreateManyInput[]) {
    await prisma.technicianExpense.createMany({
      data,
    });

    return;
  }

  async delete(id: string) {
    await prisma.technicianExpense.delete({
      where: {
        id,
      },
    });

    return;
  }

  async deleteMany(technicianId: string) {
    await prisma.technicianExpense.deleteMany({
      where: {
        technicianId,
      },
    });

    return;
  }
}