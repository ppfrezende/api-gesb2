import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteInterventionExpenseUseCaseRequest {
  interventionExpenseId: string;
}

export class DeleteInterventionExpenseUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute({
    interventionExpenseId,
  }: DeleteInterventionExpenseUseCaseRequest): Promise<void> {
    const expense = await this.interventionExpensesRepository.findById(
      interventionExpenseId,
    );

    if (!expense) {
      throw new ResourceNotFoundError();
    } else {
      await this.interventionExpensesRepository.delete(interventionExpenseId);

      return;
    }
  }
}