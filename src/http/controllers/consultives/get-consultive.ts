import { makeGetConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-get-consultive-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getConsultive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getConsultiveQuerySchema = z.object({
    consultiveId: z.string(),
  });

  const { consultiveId } = getConsultiveQuerySchema.parse(request.params);
  try {
    const getConsultive = makeGetConsultiveUseCase();

    const { consultive } = await getConsultive.execute({
      consultiveId: consultiveId,
    });

    return reply.status(200).send({
      consultive,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
