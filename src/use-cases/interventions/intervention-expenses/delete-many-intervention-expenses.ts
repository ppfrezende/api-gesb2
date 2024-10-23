import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteManyInterventionExpensesUseCaseRequest {
  interventionId: string;
  page: number;
}

export class DeleteManyInterventionExpensesUseCaseResponse {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute({
    interventionId,
    page,
  }: DeleteManyInterventionExpensesUseCaseRequest): Promise<void> {
    const expenses =
      await this.interventionExpensesRepository.listManyByInterventionId(
        interventionId,
        page,
      );

    if (!expenses) {
      throw new ResourceNotFoundError();
    } else {
      await this.interventionExpensesRepository.deleteMany(interventionId);

      return;
    }
  }
}
