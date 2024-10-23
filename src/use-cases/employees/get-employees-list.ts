import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';

interface GetEmployeesUseCaseRequest {
  page: number;
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
  }: GetEmployeesUseCaseRequest): Promise<GetEmployeesUseCaseResponse> {
    const employees = await this.employeesRepository.listMany(page);
    const allEmployees = await this.employeesRepository.listAll();

    const numberOfRegisters = employees.length.toString();
    const totalCount = allEmployees.length.toString();

    return {
      employees,
      numberOfRegisters,
      totalCount,
    };
  }
}
