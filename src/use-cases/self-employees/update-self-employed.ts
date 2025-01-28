import { Prisma, SelfEmployed } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { deleteFile } from '@/utils/file';
import { SelfEmployeesRepository } from '@/repositories/self-employees-repository';

interface UpdateSelfEmployedProfileUseCaseRequest {
  selfEmployedId: string;
  updatedBy: string;
  data: Prisma.SelfEmployedUpdateInput;
}

interface UpdateSelfEmployedProfileUseCaseResponse {
  updatedSelfEmployed: SelfEmployed | null;
}

export class UpdateSelfEmployedProfileUseCase {
  constructor(private selfEmployedRepository: SelfEmployeesRepository) {}

  async execute({
    selfEmployedId,
    updatedBy,
    data,
  }: UpdateSelfEmployedProfileUseCaseRequest): Promise<UpdateSelfEmployedProfileUseCaseResponse> {
    const self_employed = await this.selfEmployedRepository.findById(
      selfEmployedId,
    );

    if (!self_employed) {
      throw new ResourceNotFoundError();
    }

    if (self_employed.avatar) {
      await deleteFile(`tmp/avatar/${self_employed.avatar!}`);
    }

    const updatedSelfEmployed = await this.selfEmployedRepository.update(
      selfEmployedId,
      updatedBy,
      data,
    );

    return {
      updatedSelfEmployed,
    };
  }
}
