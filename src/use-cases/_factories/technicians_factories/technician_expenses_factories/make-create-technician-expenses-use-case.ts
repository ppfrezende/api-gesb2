import { PrismaTechnicianExpensesRepository } from '@/repositories/prisma/prisma-technician-expenses-repository';
import { CreateTechnicianExpensesUseCase } from '@/use-cases/technicians/technician-expenses/create-technician-expenses';

export function makeCreateTechnicianExpensesUseCase() {
  const prismaTechnicianExpensesRepository =
    new PrismaTechnicianExpensesRepository();
  const useCase = new CreateTechnicianExpensesUseCase(
    prismaTechnicianExpensesRepository,
  );

  return useCase;
}
