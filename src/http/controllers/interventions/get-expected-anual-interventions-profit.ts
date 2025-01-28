import { makeGetAnualInterventionsProfitExpectedValueUseCase } from '@/use-cases/_factories/interventions_factories/make-get-expected-anual-interventions-profit-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getAnualInterventionsProfitExpectedValue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAnualInterventionsProfitExpectedValueQuerySchema = z.object({
    year: z.coerce.number().min(0).default(0),
  });

  const { year } = getAnualInterventionsProfitExpectedValueQuerySchema.parse(
    request.query,
  );

  try {
    const getAnualInterventionsProfitExpectedValueUseCase =
      makeGetAnualInterventionsProfitExpectedValueUseCase();

    const { expectedAnualInterventionsProfit } =
      await getAnualInterventionsProfitExpectedValueUseCase.execute({
        year,
      });

    return reply
      .status(200)

      .send(expectedAnualInterventionsProfit);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
