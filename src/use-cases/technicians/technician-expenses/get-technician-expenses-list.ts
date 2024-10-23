import { TechnicianExpensesRepository } from '@/repositories/technician-expenses-repository';
import { TechnicianExpense } from '@prisma/client';

interface GetTechnicianExpensesListUseCaseRequest {
  page: number;
}

interface GetTechnicianExpensesListUseCaseResponse {
  numberOfRegisters: string;
  technicianExpenses: TechnicianExpense[];
}

export class GetTechnicianExpensesListUseCase {
  constructor(
    private technicianExpensesRepository: TechnicianExpensesRepository,
  ) {}

  async execute({
    page,
  }: GetTechnicianExpensesListUseCaseRequest): Promise<GetTechnicianExpensesListUseCaseResponse> {
    const technicianExpenses = await this.technicianExpensesRepository.listMany(
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
