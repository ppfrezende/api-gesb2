import { InterventionsRepository } from '@/repositories/interventions-repository';

interface GetAnualInterventionsProfitTotalValueUseCaseRequest {
  year: number;
}

interface GetAnualInterventionsProfitTotalValueUseCaseResponse {
  totalAnualInterventionsProfit: number;
}

export class GetAnualInterventionsProfitTotalValueUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    year,
  }: GetAnualInterventionsProfitTotalValueUseCaseRequest): Promise<GetAnualInterventionsProfitTotalValueUseCaseResponse> {
    const totalAnualInterventionsProfit =
      await this.interventionRepository.totalAnualInterventionsProfitValue(
        year,
      );

    return {
      totalAnualInterventionsProfit,
    };
  }
}