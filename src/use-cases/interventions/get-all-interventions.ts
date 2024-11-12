import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetAllInterventionsUseCaseResponse {
  totalCount: string;
  interventions: Intervention[];
}

export class GetAllInterventionsListUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute(): Promise<GetAllInterventionsUseCaseResponse> {
    const interventions = await this.interventionsRepository.listAll();

    const totalCount = interventions.length.toString();

    return {
      interventions,
      totalCount,
    };
  }
}
