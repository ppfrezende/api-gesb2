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
      include: {
        Intervention: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return interventionExpenses;
  }

  async createMany(data: Prisma.InterventionExpenseCreateManyInput[]) {
    await prisma.interventionExpense.createMany({
      data,
    });

    return;
  }

  async delete(id: string) {
    await prisma.interventionExpense.delete({
      where: {
        id,
      },
    });

    return;
  }

  async deleteMany(interventionId: string) {
    await prisma.interventionExpense.deleteMany({
      where: {
        interventionId,
      },
    });

    return;
  }
}
