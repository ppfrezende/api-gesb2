import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { DeleteInterventionExpenseUseCase } from '@/use-cases/interventions/intervention-expenses/delete-intervention-expense';

export function makeDeleteInterventionExpenseUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new DeleteInterventionExpenseUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
