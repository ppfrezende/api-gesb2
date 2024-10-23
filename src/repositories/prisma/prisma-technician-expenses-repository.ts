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
