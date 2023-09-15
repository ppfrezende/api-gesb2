import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository';
import { GetEmployeeProfileUseCase } from '../../employees/get-employee-profile';

export function makeGetEmployeeProfileUseCase() {
  const employeeRepository = new PrismaEmployeesRepository();
  const useCase = new GetEmployeeProfileUseCase(employeeRepository);

  return useCase;
}
