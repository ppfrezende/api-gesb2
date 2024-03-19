import { ExpensesRepository } from '@/repositories/expenses-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteManyExpensesUseCaseRequest {
  interventionId: string;
}

export class DeleteManyExpensesUseCaseResponse {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    interventionId,
  }: DeleteManyExpensesUseCaseRequest): Promise<void> {
    const expenses = await this.expensesRepository.findByInterventionId(
      interventionId,
    );

    if (!expenses) {
      throw new ResourceNotFoundError();
    } else {
      await this.expensesRepository.deleteMany(interventionId);

      return;
    }
  }
}
