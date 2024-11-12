import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { GetInterventionExpenseUseCase } from '@/use-cases/interventions/intervention-expenses/get-intervention-expense';

export function makeGetInterventionExpenseUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new GetInterventionExpenseUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
