import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository';
import { UpdateEmployeeProfileUseCase } from '../../employees/update-employee';

export function makeUpdateEmployeeProfileUseCase() {
  const employeeRepository = new PrismaEmployeesRepository();
  const useCase = new UpdateEmployeeProfileUseCase(employeeRepository);

  return useCase;
}
