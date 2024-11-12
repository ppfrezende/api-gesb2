import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { GetAnualInterventionsExpensesTotalValueUseCase } from '@/use-cases/interventions/intervention-expenses/get-total-anual-interventions-expenses-value';

export function makeGetAnualInterventionsExpensesTotalValueUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new GetAnualInterventionsExpensesTotalValueUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
