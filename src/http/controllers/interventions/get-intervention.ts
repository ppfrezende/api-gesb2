import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';

export async function getIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const { interventionId } = getInterventionQuerySchema.parse(request.params);

  try {
    const getIntervention = makeGetInterventionUseCase();

    const intervention = await getIntervention.execute({
      interventionId,
    });

    return reply.status(200).send(intervention);
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
