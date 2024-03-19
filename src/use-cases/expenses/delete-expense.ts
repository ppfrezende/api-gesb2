import { ExpensesRepository } from '@/repositories/expenses-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteExpenseUseCaseRequest {
  expenseId: string;
}

export class DeleteExpenseUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({ expenseId }: DeleteExpenseUseCaseRequest): Promise<void> {
    const expense = await this.expensesRepository.findById(expenseId);

    if (!expense) {
      throw new ResourceNotFoundError();
    } else {
      await this.expensesRepository.delete(expenseId);

      return;
    }
  }
}
