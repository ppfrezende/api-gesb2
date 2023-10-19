import { ConsultivesRepository } from '@/repositories/consultives-repository';
import { Consultive } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetConsultiveUseCaseRequest {
  consultiveId: string;
}

interface GetConsultiveUseCaseResponse {
  consultive: Consultive;
}

export class GetConsultiveUseCase {
  constructor(private consultivesRepository: ConsultivesRepository) {}

  async execute({
    consultiveId,
  }: GetConsultiveUseCaseRequest): Promise<GetConsultiveUseCaseResponse> {
    const consultive = await this.consultivesRepository.findById(consultiveId);

    if (!consultive) {
      throw new ResourceNotFoundError();
    }

    return {
      consultive,
    };
  }
}
