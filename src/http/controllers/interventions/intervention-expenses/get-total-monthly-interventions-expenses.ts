import { makeGetMonthlyInterventionsExpensesTotalValueUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-get-total-monthly-interventions-expenses-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getMonthlyInterventionsExpensesTotalValue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMonthlyInterventionsExpensesTotalValueQuerySchema = z.object({
    year: z.coerce.number().min(0).default(0),
    month: z.coerce.number().min(0).default(0),
  });

  const { year, month } =
    getMonthlyInterventionsExpensesTotalValueQuerySchema.parse(request.query);

  try {
    const getMonthlyInterventionsExpensesTotalValueUseCase =
      makeGetMonthlyInterventionsExpensesTotalValueUseCase();

    const { totalMonthlyInterventionsExpenses } =
      await getMonthlyInterventionsExpensesTotalValueUseCase.execute({
        year,
        month,
      });

    return reply
      .status(200)
      .headers({ 'x-month-value': totalMonthlyInterventionsExpenses })

      .send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
