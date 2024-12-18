import { InterventionsRepository } from '@/repositories/interventions-repository';

interface GetAnualInterventionsProfitExpectedValueUseCaseRequest {
  year: number;
}

interface GetAnualInterventionsProfitExpectedValueUseCaseResponse {
  expectedAnualInterventionsProfit: number;
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
