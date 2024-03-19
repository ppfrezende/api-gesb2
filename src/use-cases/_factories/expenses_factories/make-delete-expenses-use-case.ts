import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository';
import { DeleteManyExpensesUseCaseResponse } from '@/use-cases/expenses/delete-many-expenses';

export function makeDeleteManyExpensesUseCaseResponse() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const useCase = new DeleteManyExpensesUseCaseResponse(
    prismaExpensesRepository,
  );

  return useCase;
}
