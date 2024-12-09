import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { GetInterventionExpensesTrashListUseCase } from '@/use-cases/interventions/intervention-expenses/get-all-interventions-expenses-trash';

export function makeGetInterventionExpensesTrashListUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new GetInterventionExpensesTrashListUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
