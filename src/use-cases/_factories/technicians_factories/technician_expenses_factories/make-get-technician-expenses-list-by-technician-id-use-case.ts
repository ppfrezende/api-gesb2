import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { GetTechnicianExpensesListByTechnicianIdUseCase } from '@/use-cases/technicians/technician-expenses/get-technician-expenses-list-by-technician-id';

export function makeGetTechnicianExpensesListByTechnicianIdUseCase() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new GetTechnicianExpensesListByTechnicianIdUseCase(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
