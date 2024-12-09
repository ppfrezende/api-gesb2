import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';

interface GetEmployeesTrashUseCaseResponse {
  totalCount: string;
  employees: Employee[];
}

export class GetEmployeesTrashUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute(): Promise<GetEmployeesTrashUseCaseResponse> {
    const employees = await this.employeesRepository.listAllEmployeesTrash();

    const totalCount = employees.length.toString();

    return {
      employees,
      totalCount,
    };
  }
}
