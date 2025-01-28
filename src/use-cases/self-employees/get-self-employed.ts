import { SelfEmployed } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { SelfEmployeesRepository } from '@/repositories/self-employees-repository';

interface GetSelfEmployedProfileUseCaseRequest {
  selfEmployedId: string;
}

interface GetSelfEmployedProfileUseCaseResponse {
  self_employed: SelfEmployed;
}

export class GetSelfEmployedProfileUseCase {
  constructor(private selfEmployeesRepository: SelfEmployeesRepository) {}

  async execute({
    selfEmployedId,
  }: GetSelfEmployedProfileUseCaseRequest): Promise<GetSelfEmployedProfileUseCaseResponse> {
    const self_employed = await this.selfEmployeesRepository.findById(
      selfEmployedId,
    );

    if (!self_employed) {
      throw new ResourceNotFoundError();
    }

    return {
      self_employed,
    };
  }
}
