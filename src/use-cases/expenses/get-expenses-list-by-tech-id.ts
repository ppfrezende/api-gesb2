import { ExpensesRepository } from '@/repositories/expenses-repository';
import { Expense } from '@prisma/client';

interface GetExpensesListByTechIdUseCaseRequest {
  technicianId: string;
  page: number;
}

interface GetExpensesListByTechIdUseCaseResponse {
  numberOfRegisters: string;
  expenses: Expense[];
}

export class GetExpensesListByTechIdUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    technicianId,
    page,
  }: GetExpensesListByTechIdUseCaseRequest): Promise<GetExpensesListByTechIdUseCaseResponse> {
    const expenses = await this.expensesRepository.listManyByTechnicianId(
      technicianId,
      page,
    );

    expenses.map((expense) => {
      return expense;
    });

    const numberOfRegisters = expenses.length.toString();

    return {
      expenses,
      numberOfRegisters,
    };
  }
}
