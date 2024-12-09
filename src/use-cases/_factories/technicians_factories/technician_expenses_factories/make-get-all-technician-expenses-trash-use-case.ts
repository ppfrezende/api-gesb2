import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { GetTechnicianExpensesTrashListUseCase } from '@/use-cases/technicians/technician-expenses/get-all-technician-expenses-trash';

export function makeGetTechnicianExpensesTrashListUseCase() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new GetTechnicianExpensesTrashListUseCase(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
