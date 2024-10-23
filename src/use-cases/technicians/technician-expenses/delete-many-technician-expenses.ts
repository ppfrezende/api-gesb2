import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteManyTechnicianExpensesUseCaseRequest {
  technicianId: string;
  page: number;
}

export class DeleteManyTechnicianExpensesUseCaseResponse {
  constructor(
    private technicianExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute({
    technicianId,
    page,
  }: DeleteManyTechnicianExpensesUseCaseRequest): Promise<void> {
    const expenses =
      await this.technicianExpensesRepository.listManyByTechnicianId(
        technicianId,
        page,
      );

    if (!expenses) {
      throw new ResourceNotFoundError();
    } else {
      await this.technicianExpensesRepository.deleteMany(technicianId);

      return;
    }
  }
}
