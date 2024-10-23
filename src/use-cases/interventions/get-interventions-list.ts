import { InterventionsRepository } from '@/repositories/interventions-repository';
import { Intervention } from '@prisma/client';

interface GetInterventionsUseCaseRequest {
  page: number;
}

interface GetInterventionsUseCaseResponse {
  numberOfRegisters: string;
  totalCount: string;
  interventions: Intervention[];
}

export class GetInterventionsListUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    page,
  }: GetInterventionsUseCaseRequest): Promise<GetInterventionsUseCaseResponse> {
    const interventions = await this.interventionsRepository.listMany(page);
    const totalOfInterventions = await this.interventionsRepository.listAll();

    const numberOfRegisters = interventions.length.toString();
    const totalCount = totalOfInterventions.length.toString();

    return {
      interventions,
      numberOfRegisters,
      totalCount,
    };
  }
}
