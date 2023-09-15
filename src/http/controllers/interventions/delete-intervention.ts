import { makeDeleteInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-delete-intervention-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function deleteIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteInterventionBodySchema = z.object({
    interventionId: z.string(),
  });

  const { interventionId } = deleteInterventionBodySchema.parse(request.params);

  try {
    const deleteIntervention = makeDeleteInterventionUseCase();

    await deleteIntervention.execute({
      interventionId,
    });

    return reply.status(200).send();
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
