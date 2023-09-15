import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';

interface SearchEmployeesUseCaseRequest {
  query: string;
  page: number;
}

interface SearchEmployeesUseCaseResponse {
  employees: Employee[];
}

export class SearchEmployeesUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    query,
    page,
  }: SearchEmployeesUseCaseRequest): Promise<SearchEmployeesUseCaseResponse> {
    const employees = await this.employeesRepository.searchMany(query, page);

    return {
      employees,
    };
  }
}
