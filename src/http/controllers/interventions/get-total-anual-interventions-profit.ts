import { makeGetAnualInterventionsProfitTotalValueUseCase } from '@/use-cases/_factories/interventions_factories/make-get-anual-interventions-profit-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getAnualInterventionsProfitTotalValue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAnualInterventionsProfitTotalValueQuerySchema = z.object({
    year: z.coerce.number().min(0).default(0),
  });

  const { year } = getAnualInterventionsProfitTotalValueQuerySchema.parse(
    request.query,
  );

  try {
    const getAnualInterventionsProfitTotalValueUseCase =
      makeGetAnualInterventionsProfitTotalValueUseCase();

    const { totalAnualInterventionsProfit } =
      await getAnualInterventionsProfitTotalValueUseCase.execute({
        year,
      });

    return reply
      .status(200)

      .send(totalAnualInterventionsProfit);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
