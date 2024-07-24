import { prisma } from '@/lib/prisma';
import { Expense, Prisma } from '@prisma/client';
import { ExpensesRepository } from '../expenses-repository';

export class PrismaExpensesRepository implements ExpensesRepository {
  async findById(id: string): Promise<Expense | null> {
    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    return expense;
  }

  async findByTechnicianId(technicianId: string): Promise<Expense[] | null> {
    const expenses = await prisma.expense.findMany({
      where: {
        technicianId,
      },
      include: {
        Technician: true,
      },
    });

    return expenses;
  }

  async findByInterventionId(
    interventionId: string,
  ): Promise<Expense[] | null> {
    const expenses = await prisma.expense.findMany({
      where: {
        interventionId,
      },
    });

    return expenses;
  }

  async listManyByTechnicianId(technicianId: string, page: number) {
    const expenses = await prisma.expense.findMany({
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

  async listManyByInterventionId(interventionId: string, page: number) {
    const expenses = await prisma.expense.findMany({
      where: {
        interventionId,
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Intervention: true,
        Technician: true,
      },
      orderBy: {
        expense_date: 'desc',
      },
    });

    return expenses;
  }

  async listMany(page: number) {
    const expenses = await prisma.expense.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Intervention: true,
        Technician: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return expenses;
  }

  async listManyTechExpenses(page: number) {
    const expenses = await prisma.expense.findMany({
      where: {
        NOT: {
          Technician: null,
        },
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Intervention: true,
        Technician: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return expenses;
  }

  async createMany(data: Prisma.ExpenseCreateManyInput[]) {
    await prisma.expense.createMany({
      data,
    });

    return;
  }

  async delete(id: string) {
    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return;
  }

  async deleteMany(interventionId: string) {
    await prisma.expense.deleteMany({
      where: {
        interventionId,
      },
    });

    return;
  }
}
