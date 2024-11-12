import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';

interface GetMonthlyInterventionsExpensesTotalValueUseCaseRequest {
  year: number;
  month: number;
}

interface GetMonthlyInterventionsExpensesTotalValueUseCaseResponse {
  totalMonthlyInterventionsExpenses: number;
}

export class GetMonthlyInterventionsExpensesTotalValueUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute({
    year,
    month,
  }: GetMonthlyInterventionsExpensesTotalValueUseCaseRequest): Promise<GetMonthlyInterventionsExpensesTotalValueUseCaseResponse> {
    const totalMonthlyInterventionsExpenses =
      await this.interventionExpensesRepository.totalMonthlyInterventionsExpensesValue(
        year,
        month,
      );

    return {
      totalMonthlyInterventionsExpenses,
    };
  }
}
