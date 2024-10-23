import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';
import { TechnicianExpense } from '@prisma/client';

interface GetTechnicianExpensesListByTechnicianIdUseCaseRequest {
  technicianId: string;
  page: number;
}

interface GetTechnicianExpensesListByTechnicianIdUseCaseResponse {
  numberOfRegisters: string;
  technicianExpenses: TechnicianExpense[];
}

export class GetTechnicianExpensesListByTechnicianIdUseCase {
  constructor(
    private technicianExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute({
    technicianId,
    page,
  }: GetTechnicianExpensesListByTechnicianIdUseCaseRequest): Promise<GetTechnicianExpensesListByTechnicianIdUseCaseResponse> {
    const technicianExpenses =
      await this.technicianExpensesRepository.listManyByTechnicianId(
        technicianId,
        page,
      );

    technicianExpenses.map((expense) => {
      return expense;
    });

    const numberOfRegisters = technicianExpenses.length.toString();

    return {
      technicianExpenses,
      numberOfRegisters,
    };
  }
}
