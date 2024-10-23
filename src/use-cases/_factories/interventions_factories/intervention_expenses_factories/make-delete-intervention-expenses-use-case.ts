import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { DeleteManyInterventionExpensesUseCaseResponse } from '@/use-cases/interventions/intervention-expenses/delete-many-intervention-expenses';

export function makeDeleteManyInterventionExpensesUseCaseResponse() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new DeleteManyInterventionExpensesUseCaseResponse(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
