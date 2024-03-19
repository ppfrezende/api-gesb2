import { ExpensesRepository } from '@/repositories/expenses-repository';
import { Expense } from '@prisma/client';

interface GetExpensesUseCaseRequest {
  page: number;
}

interface GetExpensesUseCaseResponse {
  numberOfRegisters: string;
  expenses: Expense[];
}

export class GetExpensesListUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    page,
  }: GetExpensesUseCaseRequest): Promise<GetExpensesUseCaseResponse> {
    const expenses = await this.expensesRepository.listMany(page);

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
