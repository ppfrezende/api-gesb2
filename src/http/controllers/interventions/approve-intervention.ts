import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function approveIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const approveInterventionBodySchema = z.object({
    isApproved: z.boolean().default(false),
  });
  const approveInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const { isApproved } = approveInterventionBodySchema.parse(request.body);

  const { interventionId } = approveInterventionQuerySchema.parse(
    request.params,
  );

  try {
    const updateInterventionUseCase = makeUpdateInterventionUseCase();

    const { updatedIntervention } = await updateInterventionUseCase.execute({
      interventionId: interventionId,
      data: {
        isApproved,
      },
    });

    return reply.status(200).send(updatedIntervention);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
