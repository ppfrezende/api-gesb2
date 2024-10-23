import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { DeleteManyTechnicianExpensesUseCaseResponse } from '@/use-cases/technicians/technician-expenses/delete-many-technician-expenses';

export function makeDeleteManyTechnicianExpensesUseCaseResponse() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new DeleteManyTechnicianExpensesUseCaseResponse(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
