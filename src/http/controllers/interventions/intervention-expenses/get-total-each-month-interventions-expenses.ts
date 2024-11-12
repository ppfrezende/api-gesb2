import { makeGetMonthlyInterventionsExpensesTotalValueUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-get-total-monthly-interventions-expenses-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getTotalEachMonthInterventionsExpenses(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTotalEachMonthInterventionsExpensesQuerySchema = z.object({
    year: z.coerce.number().min(0).default(new Date().getFullYear()),
  });

  const { year } = getTotalEachMonthInterventionsExpensesQuerySchema.parse(
    request.query,
  );

  try {
    const getMonthlyInterventionsExpensesTotalValueUseCase =
      makeGetMonthlyInterventionsExpensesTotalValueUseCase();

    const monthlyInterventionsExpenses: { [key: number]: number } = {};

    for (let month = 0; month <= 11; month++) {
      const { totalMonthlyInterventionsExpenses } =
        await getMonthlyInterventionsExpensesTotalValueUseCase.execute({
          year,
          month,
        });
      monthlyInterventionsExpenses[month] =
        totalMonthlyInterventionsExpenses || 0;
    }
    return reply
      .status(200)

      .send({ monthlyInterventionsExpenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
