import { InterventionsRepository } from '@/repositories/interventions-repository';

interface GetAnualInterventionsProfitExpectedValueUseCaseRequest {
  year: number;
}

interface GetAnualInterventionsProfitExpectedValueUseCaseResponse {
  expectedAnualInterventionsProfit: {
    USD: number;
    EUR: number;
    BRL: number;
  };
}

export class GetAnualInterventionsProfitExpectedValueUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    year,
  }: GetAnualInterventionsProfitExpectedValueUseCaseRequest): Promise<GetAnualInterventionsProfitExpectedValueUseCaseResponse> {
    const expectedAnualInterventionsProfit =
      await this.interventionRepository.expectedAnualInterventionsProfitValue(
        year,
      );

    return {
      expectedAnualInterventionsProfit,
    };
  }
}
