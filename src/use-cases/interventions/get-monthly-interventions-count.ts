import { InterventionsRepository } from '@/repositories/interventions-repository';

interface GetMonthlyInterventionsCountUseCaseRequest {
  year: number;
  month: number;
}

interface GetMonthlyInterventionsCountUseCaseResponse {
  totalMonthlyInterventionsCount: number;
}

export class GetMonthlyInterventionsCountUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    year,
    month,
  }: GetMonthlyInterventionsCountUseCaseRequest): Promise<GetMonthlyInterventionsCountUseCaseResponse> {
    const totalMonthlyInterventionsCount =
      await this.interventionRepository.totalMonthlyInterventionsCount(
        year,
        month,
      );

    return {
      totalMonthlyInterventionsCount,
    };
  }
}
