import { ExpensesRepository } from '@/repositories/expenses-repository';

type ExpenseData = {
  expense_date: Date | string;
  type: string;
  description: string;
  currency: string;
  currency_quote: number;
  expense_value: number;
  total_converted: number;
  technicianId: string;
  interventionId?: string;
  userName: string;
};

export class CreateExpensesUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute(data: ExpenseData[]): Promise<void> {
    await this.expensesRepository.createMany(data);

    return;
  }
}
