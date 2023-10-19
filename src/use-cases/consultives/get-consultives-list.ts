import { ConsultivesRepository } from '@/repositories/consultives-repository';
import { Consultive } from '@prisma/client';

interface GetConsultivesUseCaseRequest {
  page: number;
}

interface GetConsultivesUseCaseResponse {
  numberOfRegisters: string;
  consultives: Consultive[];
}

export class GetConsultivesListUseCase {
  constructor(private consultivesRepository: ConsultivesRepository) {}

  async execute({
    page,
  }: GetConsultivesUseCaseRequest): Promise<GetConsultivesUseCaseResponse> {
    const consultives = await this.consultivesRepository.listMany(page);

    consultives.map((employee) => {
      return employee;
    });

    const numberOfRegisters = consultives.length.toString();

    return {
      consultives,
      numberOfRegisters,
    };
  }
}
