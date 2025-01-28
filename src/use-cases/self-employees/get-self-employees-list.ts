import { SelfEmployeesRepository } from '@/repositories/self-employees-repository';
import { SelfEmployed } from '@prisma/client';

interface GetSelfEmployeesListUseCaseRequest {
  page: number;
  isActive: boolean;
}

interface GetSelfEmployeesListUseCaseResponse {
  numberOfRegisters: string;
  totalCount: string;
  self_employees: SelfEmployed[];
}

export class GetSelfEmployeesListUseCase {
  constructor(private selfEmployeesRepository: SelfEmployeesRepository) {}

  async execute({
    page,
    isActive,
  }: GetSelfEmployeesListUseCaseRequest): Promise<GetSelfEmployeesListUseCaseResponse> {
    if (isActive === true) {
      const self_employees = await this.selfEmployeesRepository.listMany(page);
      const allSelfEmployees =
        await this.selfEmployeesRepository.listAllActive();

      const numberOfRegisters = self_employees.length.toString();
      const totalCount = allSelfEmployees.length.toString();

      return {
        self_employees,
        numberOfRegisters,
        totalCount,
      };
    } else {
      const self_employees =
        await this.selfEmployeesRepository.listManyInactive(page);
      const allSelfEmployees =
        await this.selfEmployeesRepository.listAllInactive();

      const numberOfRegisters = self_employees.length.toString();
      const totalCount = allSelfEmployees.length.toString();

      return {
        self_employees,
        numberOfRegisters,
        totalCount,
      };
    }
  }
}
