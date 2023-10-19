import { ConsultivesRepository } from '@/repositories/consultives-repository';
import { Consultive, Prisma } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateConsultiveUseCaseRequest {
  consultiveId: string;
  data: Prisma.ConsultiveUncheckedUpdateInput;
}

interface UpdateConsultiveUseCaseResponse {
  updatedConsultive: Consultive | null;
}

export class UpdateConsultiveUseCase {
  constructor(private consultivesRepository: ConsultivesRepository) {}

  async execute({
    consultiveId,
    data,
  }: UpdateConsultiveUseCaseRequest): Promise<UpdateConsultiveUseCaseResponse> {
    const consultive = await this.consultivesRepository.findById(consultiveId);

    if (!consultive) {
      throw new ResourceNotFoundError();
    }

    const updatedConsultive = await this.consultivesRepository.update(
      consultiveId,
      data,
    );

    return {
      updatedConsultive,
    };
  }
}
