import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { CreateInterventionExpensesUseCase } from '@/use-cases/interventions/intervention-expenses/create-intervention-expenses';

export function makeCreateInterventionExpensesUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new CreateInterventionExpensesUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
