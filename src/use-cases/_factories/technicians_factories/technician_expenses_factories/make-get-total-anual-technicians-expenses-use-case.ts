import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { GetAnualTechniciansExpensesTotalValueUseCase } from '@/use-cases/technicians/technician-expenses/get-total-anual-technicians-expenses';

export function makeGetAnualTechniciansExpensesTotalValueUseCase() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new GetAnualTechniciansExpensesTotalValueUseCase(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
