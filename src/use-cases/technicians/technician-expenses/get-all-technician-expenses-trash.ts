import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';
import { TechnicianExpense } from '@prisma/client';

interface GetTechnicianExpensesTrashListUseCaseResponse {
  numberOfRegisters: string;
  technicianExpenses: TechnicianExpense[];
}

export class GetTechnicianExpensesTrashListUseCase {
  constructor(
    private technicianExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute(): Promise<GetTechnicianExpensesTrashListUseCaseResponse> {
    const technicianExpenses =
      await this.technicianExpensesRepository.listAllTechnicianExpensesTrash();

    technicianExpenses.map((expense) => {
      return expense;
    });

    const numberOfRegisters = technicianExpenses.length.toString();

    return {
      technicianExpenses,
      numberOfRegisters,
    };
  }
}
