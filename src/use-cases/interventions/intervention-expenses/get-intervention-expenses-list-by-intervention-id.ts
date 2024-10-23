import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';
import { InterventionExpense } from '@prisma/client';

interface GetInterventionExpensesListByInterventionIdUseCaseRequest {
  interventionId: string;
  page: number;
}

interface GetInterventionExpensesListByInterventionIdUseCaseResponse {
  numberOfRegisters: string;
  interventionExpenses: InterventionExpense[];
}

export class GetInterventionExpensesListByInterventionIdUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute({
    interventionId,
    page,
  }: GetInterventionExpensesListByInterventionIdUseCaseRequest): Promise<GetInterventionExpensesListByInterventionIdUseCaseResponse> {
    const interventionExpenses =
      await this.interventionExpensesRepository.listManyByInterventionId(
        interventionId,
        page,
      );

    interventionExpenses.map((expense) => {
      return expense;
    });

    const numberOfRegisters = interventionExpenses.length.toString();

    return {
      interventionExpenses,
      numberOfRegisters,
    };
  }
}
