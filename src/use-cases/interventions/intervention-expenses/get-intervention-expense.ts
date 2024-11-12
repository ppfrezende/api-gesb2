import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { InterventionExpense } from '@prisma/client';

interface GetInterventionExpenseUseCaseRequest {
  interventionExpenseId: string;
}

interface GetInterventionExpenseUseCaseResponse {
  interventionExpense: InterventionExpense;
}

export class GetInterventionExpenseUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute({
    interventionExpenseId,
  }: GetInterventionExpenseUseCaseRequest): Promise<GetInterventionExpenseUseCaseResponse> {
    const interventionExpense =
      await this.interventionExpensesRepository.findById(interventionExpenseId);

    if (!interventionExpense) {
      throw new ResourceNotFoundError();
    }

    return {
      interventionExpense,
    };
  }
}
