import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { DeleteTechnicianExpenseUseCase } from '@/use-cases/technicians/technician-expenses/delete-technician-expense';

export function makeDeleteTechnicianExpenseUseCase() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new DeleteTechnicianExpenseUseCase(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
