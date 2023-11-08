import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionsUseCaseRequest {
  page: number;
}

interface GetInterventionsUseCaseResponse {
  numberOfRegisters: string;
  interventions: Intervention[];
}

export class GetInterventionsListUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    page,
  }: GetInterventionsUseCaseRequest): Promise<GetInterventionsUseCaseResponse> {
    const interventions = await this.interventionsRepository.listMany(page);

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
