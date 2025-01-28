import { SelfEmployeesRepository } from '@/repositories/self-employees-repository';
import { SelfEmployed } from '@prisma/client';

interface GetSelfEmployeesTrashUseCaseResponse {
  totalCount: string;
  self_employees: SelfEmployed[];
}

export class GetSelfEmployeesTrashUseCase {
  constructor(private selfEmployeesRepository: SelfEmployeesRepository) {}

  async execute(): Promise<GetSelfEmployeesTrashUseCaseResponse> {
    const self_employees =
      await this.selfEmployeesRepository.listAllSelfEmployedsTrash();

    const totalCount = self_employees.length.toString();

    return {
      self_employees,
      totalCount,
    };
  }
}
