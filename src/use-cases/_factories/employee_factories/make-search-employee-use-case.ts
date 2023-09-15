import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository';
import { SearchEmployeesUseCase } from '../../employees/search-employees';

export function makeSearchEmployeeUseCase() {
  const prismaEmployeesRepository = new PrismaEmployeesRepository();
  const useCase = new SearchEmployeesUseCase(prismaEmployeesRepository);

  return useCase;
}
