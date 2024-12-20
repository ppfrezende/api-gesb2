import { prisma } from '@/lib/prisma';
import { InterventionExpense, Prisma } from '@prisma/client';
import { InterventionExpensesRepository } from '../intervention-expenses-repository';

export class PrismaInterventionExpensesRepository
  implements InterventionExpensesRepository
{
  async findById(id: string): Promise<InterventionExpense | null> {
    const interventionExpense = await prisma.interventionExpense.findUnique({
      where: {
        id,
      },
    });

    return interventionExpense;
  }

  async listManyByInterventionId(interventionId: string, page: number) {
    const expenses = await prisma.interventionExpense.findMany({
      where: {
        interventionId,
        isDeleted: false,
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Intervention: true,
      },
      orderBy: {
        expense_date: 'desc',
      },
    });

    return expenses;
  }

  async listMany(page: number) {
    const interventionExpenses = await prisma.interventionExpense.findMany({
      where: {
        isDeleted: false,
      },
      take: 50,
      skip: (page - 1) * 50,
      include: {
        Intervention: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return interventionExpenses;
  }

  async listAll() {
    const interventionExpenses = await prisma.interventionExpense.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        Intervention: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return interventionExpenses;
  }

  async listAllInterventionExpensesTrash() {
    const interventionExpenses = await prisma.interventionExpense.findMany({
      where: {
        isDeleted: true,
      },
      include: {
        Intervention: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return interventionExpenses;
  }

  async totalAnualInterventionsExpensesValue(year: number) {
    const totalAnualInterventionExpenses =
      await prisma.interventionExpense.aggregate({
        _sum: {
          expense_value: true,
        },
        where: {
          isDeleted: false,
          expense_date: {
            gte: new Date(year, 0, 1),
            lt: new Date(year + 1, 0, 1),
          },
        },
      });

    return totalAnualInterventionExpenses._sum.expense_value ?? 0;
  }

  async totalMonthlyInterventionsExpensesValue(year: number, month: number) {
    const totalMonthInterventionExpenses =
      await prisma.interventionExpense.aggregate({
        _sum: {
          expense_value: true,
        },
        where: {
          isDeleted: false,
          expense_date: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      });

    return totalMonthInterventionExpenses._sum.expense_value ?? 0;
  }

  async createMany(data: Prisma.InterventionExpenseCreateManyInput[]) {
    await prisma.interventionExpense.createMany({
      data,
    });

    return;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.interventionExpense.updateMany({
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

  async deleteMany(interventionId: string, deletedBy: string) {
    await prisma.interventionExpense.updateMany({
      where: {
        interventionId,
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
