import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository';
import { RegisterEmployeeUseCase } from '../../employees/register-employees';

export function makeRegisterEmployeeUseCase() {
  const prismaEmployeesRepository = new PrismaEmployeesRepository();
  const useCase = new RegisterEmployeeUseCase(prismaEmployeesRepository);

  return useCase;
}
