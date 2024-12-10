import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';

type TechnicianExpenseData = {
  expense_date: Date | string;
  expense_type: string;
  description: string;
  currency: string;
  currency_quote: number;
  expense_value: number;
  total_converted: number;
  technicianId: string;
  userId: string;
};

export class CreateTechnicianExpensesUseCase {
  constructor(
    private technicianExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute(data: TechnicianExpenseData[]): Promise<void> {
    await this.technicianExpensesRepository.createMany(data);

    return;
  }
}
