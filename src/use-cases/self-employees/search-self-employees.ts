import { SelfEmployeesRepository } from '@/repositories/self-employees-repository';
import { SelfEmployed } from '@prisma/client';

interface SearchSelfEmployeesUseCaseRequest {
  query: string;
  page: number;
}

interface SearchSelfEmployeesUseCaseResponse {
  numberOfRegisters: string;
  self_employees: SelfEmployed[];
}

export class SearchSelfEmployeesUseCase {
  constructor(private selfEmployeesRespository: SelfEmployeesRepository) {}

  async execute({
    query,
    page,
  }: SearchSelfEmployeesUseCaseRequest): Promise<SearchSelfEmployeesUseCaseResponse> {
    const self_employees = await this.selfEmployeesRespository.searchMany(
      query,
      page,
    );

    const numberOfRegisters = self_employees.length.toString();

    return {
      self_employees,
      numberOfRegisters,
    };
  }
}
