import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetAllInterventionsTrashUseCaseResponse {
  totalCount: string;
  interventions: Intervention[];
}

export class GetAllInterventionsTrashListUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute(): Promise<GetAllInterventionsTrashUseCaseResponse> {
    const interventions =
      await this.interventionsRepository.listAllInterventionsTrash();

    const totalCount = interventions.length.toString();

    return {
      interventions,
      totalCount,
    };
  }
}
