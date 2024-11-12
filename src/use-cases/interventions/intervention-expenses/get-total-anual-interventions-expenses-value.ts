import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';

interface GetAnualInterventionsExpensesTotalValueUseCaseRequest {
  year: number;
}

interface GetAnualInterventionsExpensesTotalValueUseCaseResponse {
  totalAnualInterventionsExpenses: number;
}

export class GetAnualInterventionsExpensesTotalValueUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute({
    year,
  }: GetAnualInterventionsExpensesTotalValueUseCaseRequest): Promise<GetAnualInterventionsExpensesTotalValueUseCaseResponse> {
    const totalAnualInterventionsExpenses =
      await this.interventionExpensesRepository.totalAnualInterventionsExpensesValue(
        year,
      );

    return {
      totalAnualInterventionsExpenses,
    };
  }
}
