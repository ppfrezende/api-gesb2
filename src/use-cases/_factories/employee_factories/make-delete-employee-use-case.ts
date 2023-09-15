import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository';
import { DeleteEmployeeUseCase } from '../../employees/delete-employee';

export function makeDeleteEmployeeProfileUseCase() {
  const employeeRepository = new PrismaEmployeesRepository();
  const useCase = new DeleteEmployeeUseCase(employeeRepository);

  return useCase;
}
