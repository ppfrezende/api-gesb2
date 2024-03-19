import { makeGetExpensesListByInterventionIdUseCase } from '@/use-cases/_factories/expenses_factories/make-get-expenses-list-by-intervention-id-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getExpensesByInterventionId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getExpensesByInterventionIdQueryParams = z.object({
    interventionId: z.string(),
  });

  const getExpensesByInterventionIdQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getExpensesByInterventionIdQuerySchema.parse(request.query);

  const { interventionId } = getExpensesByInterventionIdQueryParams.parse(
    request.params,
  );

  try {
    const getExpensesByInterventionIdUseCase =
      makeGetExpensesListByInterventionIdUseCase();

    const { expenses, numberOfRegisters } =
      await getExpensesByInterventionIdUseCase.execute({
        interventionId,
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ expenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
