import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { GetTechnicianExpensesListUseCase } from '@/use-cases/technicians/technician-expenses/get-technician-expenses-list';

export function makeGetTechnicianExpensesListUseCase() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new GetTechnicianExpensesListUseCase(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
