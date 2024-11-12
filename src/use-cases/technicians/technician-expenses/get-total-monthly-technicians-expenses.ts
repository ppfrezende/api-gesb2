import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';

interface GetMonthlyTechniciansExpensesTotalValueUseCaseRequest {
  year: number;
  month: number;
}

interface GetMonthlyTechniciansExpensesTotalValueUseCaseResponse {
  totalMonthlyTechniciansExpenses: number;
}

export class GetMonthlyTechniciansExpensesTotalValueUseCase {
  constructor(
    private techniciansExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute({
    year,
    month,
  }: GetMonthlyTechniciansExpensesTotalValueUseCaseRequest): Promise<GetMonthlyTechniciansExpensesTotalValueUseCaseResponse> {
    const totalMonthlyTechniciansExpenses =
      await this.techniciansExpensesRepository.totalMonthlyTechniciansExpensesValue(
        year,
        month,
      );

    return {
      totalMonthlyTechniciansExpenses,
    };
  }
}
