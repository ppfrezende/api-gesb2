import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';

interface GetAnualTechniciansExpensesTotalValueUseCaseRequest {
  year: number;
}

interface GetAnualTechniciansExpensesTotalValueUseCaseResponse {
  totalAnualTechniciansExpenses: number;
}

export class GetAnualTechniciansExpensesTotalValueUseCase {
  constructor(
    private techniciansExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute({
    year,
  }: GetAnualTechniciansExpensesTotalValueUseCaseRequest): Promise<GetAnualTechniciansExpensesTotalValueUseCaseResponse> {
    const totalAnualTechniciansExpenses =
      await this.techniciansExpensesRepository.totalAnualTechniciansExpensesValue(
        year,
      );

    return {
      totalAnualTechniciansExpenses,
    };
  }
}
