import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { GetMonthlyInterventionsExpensesTotalValueUseCase } from '@/use-cases/interventions/intervention-expenses/get-total-monthly-interventions-expenses-value';

export function makeGetMonthlyInterventionsExpensesTotalValueUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new GetMonthlyInterventionsExpensesTotalValueUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
