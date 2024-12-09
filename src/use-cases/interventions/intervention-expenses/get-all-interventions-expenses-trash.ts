import { InterventionExpensesRepository } from '@/repositories/intervention-expenses-repository';
import { InterventionExpense } from '@prisma/client';

interface GetInterventionExpensesTrashListUseCaseResponse {
  totalCount: string;
  interventionsExpenses: InterventionExpense[];
}

export class GetInterventionExpensesTrashListUseCase {
  constructor(
    private interventionExpensesRepository: InterventionExpensesRepository,
  ) {}

  async execute(): Promise<GetInterventionExpensesTrashListUseCaseResponse> {
    const interventionsExpenses =
      await this.interventionExpensesRepository.listAllInterventionExpensesTrash();

    interventionsExpenses.map((expense) => {
      return expense;
    });

    const totalCount = interventionsExpenses.length.toString();

    return {
      interventionsExpenses,
      totalCount,
    };
  }
}
