import { makeGetAnualInterventionsExpensesTotalValueUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-get-total-anual-interventions-expenses-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getAnualInterventionsExpensesTotalValue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAnualInterventionsExpensesTotalValueQuerySchema = z.object({
    year: z.coerce.number().min(0).default(0),
  });

  const { year } = getAnualInterventionsExpensesTotalValueQuerySchema.parse(
    request.query,
  );

  try {
    const getAnualInterventionsExpensesTotalValueUseCase =
      makeGetAnualInterventionsExpensesTotalValueUseCase();

    const { totalAnualInterventionsExpenses } =
      await getAnualInterventionsExpensesTotalValueUseCase.execute({
        year,
      });

    return reply
      .status(200)
      .headers({ 'x-year-value': totalAnualInterventionsExpenses })

      .send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
