import { makeGetMonthlyInterventionsProfitTotalValueUseCase } from '@/use-cases/_factories/interventions_factories/make-get-monthly-interventions-profit-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getMonthlyInterventionsProfitTotalValue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMonthlyInterventionsProfitTotalValueQuerySchema = z.object({
    year: z.coerce.number().min(0).default(0),
    month: z.coerce.number().min(0).default(0),
  });

  const { year, month } =
    getMonthlyInterventionsProfitTotalValueQuerySchema.parse(request.query);

  try {
    const getMonthlyInterventionsProfitTotalValueUseCase =
      makeGetMonthlyInterventionsProfitTotalValueUseCase();

    const { totalMonthlyInterventionsProfit } =
      await getMonthlyInterventionsProfitTotalValueUseCase.execute({
        year,
        month,
      });

    return reply
      .status(200)
      .headers({ 'x-month-value': totalMonthlyInterventionsProfit })

      .send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
