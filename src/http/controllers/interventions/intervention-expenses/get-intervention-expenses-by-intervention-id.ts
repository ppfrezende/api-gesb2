import { makeGetInterventionExpensesListByInterventionIdUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-get-intervention-expenses-list-by-intervention-id-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getInterventionExpensesListByInterventionId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInterventionExpensesListByInterventionIdQueryParams = z.object({
    interventionId: z.string(),
  });

  const getInterventionExpensesListByInterventionIdQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getInterventionExpensesListByInterventionIdQuerySchema.parse(
    request.query,
  );

  const { interventionId } =
    getInterventionExpensesListByInterventionIdQueryParams.parse(
      request.params,
    );

  try {
    const getInterventionExpensesListByInterventionIdUseCase =
      makeGetInterventionExpensesListByInterventionIdUseCase();

    const { interventionExpenses, numberOfRegisters } =
      await getInterventionExpensesListByInterventionIdUseCase.execute({
        interventionId,
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ interventionExpenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
