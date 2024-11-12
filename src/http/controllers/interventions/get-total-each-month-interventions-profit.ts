import { makeGetMonthlyInterventionsProfitTotalValueUseCase } from '@/use-cases/_factories/interventions_factories/make-get-monthly-interventions-profit-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getTotalEachMonthInterventionsProfit(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTotalEachMonthInterventionsProfitQuerySchema = z.object({
    year: z.coerce.number().min(0).default(new Date().getFullYear()),
  });

  const { year } = getTotalEachMonthInterventionsProfitQuerySchema.parse(
    request.query,
  );

  try {
    const getMonthlyInterventionsProfitTotalValueUseCase =
      makeGetMonthlyInterventionsProfitTotalValueUseCase();

    const monthlyInterventionsProfit: { [key: number]: number } = {};

    for (let month = 0; month <= 11; month++) {
      const { totalMonthlyInterventionsProfit } =
        await getMonthlyInterventionsProfitTotalValueUseCase.execute({
          year,
          month,
        });
      monthlyInterventionsProfit[month] = totalMonthlyInterventionsProfit || 0;
    }
    return reply
      .status(200)

      .send({ monthlyInterventionsProfit });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
