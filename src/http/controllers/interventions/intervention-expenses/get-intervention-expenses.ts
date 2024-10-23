import { makeGetInterventionExpensesListUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-get-intervention-expenses-list-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getInterventionExpensesList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInterventionExpensesListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getInterventionExpensesListQuerySchema.parse(request.query);

  try {
    const getInterventionExpensesListUseCase =
      makeGetInterventionExpensesListUseCase();

    const { interventionExpenses, numberOfRegisters, totalCount } =
      await getInterventionExpensesListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-page-count': numberOfRegisters })
      .headers({ 'x-total-count': totalCount })

      .send({ interventionExpenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
