import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository';
import { CreateExpensesUseCase } from '@/use-cases/expenses/create-expenses';

export function makeCreateExpensesUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const useCase = new CreateExpensesUseCase(prismaExpensesRepository);

  return useCase;
}
