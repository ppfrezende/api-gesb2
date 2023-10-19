import { ConsultivesRepository } from '@/repositories/consultives-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteConsultiveUseCaseRequest {
  consultiveId: string;
}

export class DeleteConsultiveUseCase {
  constructor(private consultivesRepository: ConsultivesRepository) {}

  async execute({
    consultiveId,
  }: DeleteConsultiveUseCaseRequest): Promise<void> {
    const consultive = await this.consultivesRepository.findById(consultiveId);

    if (!consultive) {
      throw new ResourceNotFoundError();
    } else {
      await this.consultivesRepository.delete(consultiveId);

      return;
    }
  }
}
