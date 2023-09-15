import { InterventionsRepository } from '@/repositories/interventions-respository';
import { Intervention } from '@prisma/client';

interface GetInterventionsListUseCaseRequest {
  page: number;
}

interface GetInterventionsListUseCaseResponse {
  numberOfRegisters: string;
  interventions: Intervention[];
}

export class GetInterventionsListUseCase {
  constructor(private interventionRepository: InterventionsRepository) {}

  async execute({
    page,
  }: GetInterventionsListUseCaseRequest): Promise<GetInterventionsListUseCaseResponse> {
    const interventions = await this.interventionRepository.listMany(page);

    interventions.map((intervention) => {
      return intervention;
    });

    const numberOfRegisters = interventions.length.toString();

    return {
      interventions,
      numberOfRegisters,
    };
  }
}
