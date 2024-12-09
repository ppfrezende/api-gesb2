import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository';
import { GetEmployeesTrashUseCase } from '../../employees/get-all-employees-trash';

export function makeGetEmployeesTrashUseCase() {
  const employeesRepository = new PrismaEmployeesRepository();
  const useCase = new GetEmployeesTrashUseCase(employeesRepository);

  return useCase;
}
