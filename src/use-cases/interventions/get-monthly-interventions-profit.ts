import { InterventionsRepository } from '@/repositories/interventions-repository';

interface GetMonthlyInterventionsProfitTotalValueUseCaseRequest {
  year: number;
  month: number;
}

interface GetMonthlyInterventionsProfitTotalValueUseCaseResponse {
  totalMonthlyInterventionsProfit: number;
}

export class GetMonthlyInterventionsProfitTotalValueUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    year,
    month,
  }: GetMonthlyInterventionsProfitTotalValueUseCaseRequest): Promise<GetMonthlyInterventionsProfitTotalValueUseCaseResponse> {
    const totalMonthlyInterventionsProfit =
      await this.interventionRepository.totalMonthlyInterventionsProfitValue(
        year,
        month,
      );

    return {
      totalMonthlyInterventionsProfit,
    };
  }
}
