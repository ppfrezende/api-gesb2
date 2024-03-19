import { ExpensesRepository } from '@/repositories/expenses-repository';
import { Expense } from '@prisma/client';

interface GetExpensesListByInterventionIdUseCaseRequest {
  interventionId: string;
  page: number;
}

interface GetExpensesListByInterventionIdUseCaseResponse {
  numberOfRegisters: string;
  expenses: Expense[];
}

export class GetExpensesListByInterventionIdUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    interventionId,
    page,
  }: GetExpensesListByInterventionIdUseCaseRequest): Promise<GetExpensesListByInterventionIdUseCaseResponse> {
    const expenses = await this.expensesRepository.listManyByInterventionId(
      interventionId,
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
