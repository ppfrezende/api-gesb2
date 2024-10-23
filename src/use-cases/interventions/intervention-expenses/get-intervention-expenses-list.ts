import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';
import { InterventionExpense } from '@prisma/client';

interface GetInterventionExpensesListUseCaseRequest {
  page: number;
}

interface GetInterventionExpensesListUseCaseResponse {
  numberOfRegisters: string;
  totalCount: string;
  interventionExpenses: InterventionExpense[];
}

export class GetInterventionExpensesListUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute({
    page,
  }: GetInterventionExpensesListUseCaseRequest): Promise<GetInterventionExpensesListUseCaseResponse> {
    const interventionExpenses =
      await this.interventionExpensesRepository.listMany(page);
    const allInterventionsExpenses =
      await this.interventionExpensesRepository.listAll();

    interventionExpenses.map((expense) => {
      return expense;
    });

    const numberOfRegisters = interventionExpenses.length.toString();
    const totalCount = allInterventionsExpenses.length.toString();

    return {
      interventionExpenses,
      numberOfRegisters,
      totalCount,
    };
  }
}
