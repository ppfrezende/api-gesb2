import { ExpensesRepository } from '@/repositories/expenses-repository';
import { Expense } from '@prisma/client';

interface GetAllTechExpensesUseCaseRequest {
  page: number;
}

interface GetAllTechExpensesUseCaseResponse {
  numberOfRegisters: string;
  expenses: Expense[];
}

export class GetAllTechExpensesListUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    page,
  }: GetAllTechExpensesUseCaseRequest): Promise<GetAllTechExpensesUseCaseResponse> {
    const expenses = await this.expensesRepository.listManyTechExpenses(page);

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
