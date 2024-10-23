import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteTechnicianExpenseUseCaseRequest {
  technicianExpenseId: string;
}

export class DeleteTechnicianExpenseUseCase {
  constructor(
    private technicianExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute({
    technicianExpenseId,
  }: DeleteTechnicianExpenseUseCaseRequest): Promise<void> {
    const expense = await this.technicianExpensesRepository.findById(
      technicianExpenseId,
    );

    if (!expense) {
      throw new ResourceNotFoundError();
    } else {
      await this.technicianExpensesRepository.delete(technicianExpenseId);

      return;
    }
  }
}
