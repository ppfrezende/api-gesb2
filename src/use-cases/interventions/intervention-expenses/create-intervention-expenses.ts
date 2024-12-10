import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';

type InterventionExpenseData = {
  expense_date: Date | string;
  expense_type: string;
  description: string;
  currency: string;
  currency_quote: number;
  expense_value: number;
  total_converted: number;
  interventionId: string;
  userId: string;
};

export class CreateInterventionExpensesUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute(data: InterventionExpenseData[]): Promise<void> {
    await this.interventionExpensesRepository.createMany(data);

    return;
  }
}
