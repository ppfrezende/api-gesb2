import { makeGetMonthlyInterventionsCountUseCase } from '@/use-cases/_factories/interventions_factories/make-get-monthly-interventions-count-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getTotalEachMonthInterventionsCount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTotalEachMonthInterventionsCountQuerySchema = z.object({
    year: z.coerce.number().min(0).default(new Date().getFullYear()),
  });

  const { year } = getTotalEachMonthInterventionsCountQuerySchema.parse(
    request.query,
  );

  try {
    const getMonthlyInterventionsCountUseCase =
      makeGetMonthlyInterventionsCountUseCase();

    const monthlyInterventionsCount: { [key: number]: number } = {};

    for (let month = 0; month <= 11; month++) {
      const { totalMonthlyInterventionsCount } =
        await getMonthlyInterventionsCountUseCase.execute({
          year,
          month,
        });
      monthlyInterventionsCount[month] = totalMonthlyInterventionsCount || 0;
    }
    return reply
      .status(200)

      .send({ monthlyInterventionsCount });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
