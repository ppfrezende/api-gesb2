import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';

interface GetEmployeesUseCaseRequest {
  page: number;
}

interface GetEmployeesUseCaseResponse {
  numberOfRegisters: string;
  employees: Employee[];
}

export class GetEmployeesUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    page,
  }: GetEmployeesUseCaseRequest): Promise<GetEmployeesUseCaseResponse> {
    const employees = await this.employeesRepository.listMany(page);

    employees.map((employee) => {
      return employee;
    });

    const numberOfRegisters = employees.length.toString();

    return {
      employees,
      numberOfRegisters,
    };
  }
}
