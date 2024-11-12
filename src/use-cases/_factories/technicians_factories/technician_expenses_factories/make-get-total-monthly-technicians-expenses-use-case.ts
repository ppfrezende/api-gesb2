import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { GetMonthlyTechniciansExpensesTotalValueUseCase } from '@/use-cases/technicians/technician-expenses/get-total-monthly-technicians-expenses';

export function makeGetMonthlyTechniciansExpensesTotalValueUseCase() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new GetMonthlyTechniciansExpensesTotalValueUseCase(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
