import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';

interface GetEmployeesUseCaseRequest {
  page: number;
  isActive: boolean;
}

interface GetEmployeesUseCaseResponse {
  numberOfRegisters: string;
  totalCount: string;
  employees: Employee[];
}

export class GetEmployeesUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    page,
    isActive,
  }: GetEmployeesUseCaseRequest): Promise<GetEmployeesUseCaseResponse> {
    if (isActive === true) {
      const employees = await this.employeesRepository.listMany(page);
      const allEmployees = await this.employeesRepository.listAllActive();

      const numberOfRegisters = employees.length.toString();
      const totalCount = allEmployees.length.toString();
      return {
        employees,
        numberOfRegisters,
        totalCount,
      };
    } else {
      const employees = await this.employeesRepository.listManyInactive(page);
      const allEmployees = await this.employeesRepository.listAllInactive();

      const numberOfRegisters = employees.length.toString();
      const totalCount = allEmployees.length.toString();
      return {
        employees,
        numberOfRegisters,
        totalCount,
      };
    }
  }
}
