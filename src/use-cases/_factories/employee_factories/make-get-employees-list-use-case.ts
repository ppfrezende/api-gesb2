import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository';
import { GetEmployeesUseCase } from '../../employees/get-employees-list';

export function makeGetEmployeesListUserCase() {
  const employeesRepository = new PrismaEmployeesRepository();
  const useCase = new GetEmployeesUseCase(employeesRepository);

  return useCase;
}
