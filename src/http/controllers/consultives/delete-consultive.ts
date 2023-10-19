import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-delete-consultive-use-case';

export async function deleteConsultive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteConsultiveQuerySchema = z.object({
    consultiveId: z.string(),
  });

  const { consultiveId } = deleteConsultiveQuerySchema.parse(request.params);

  try {
    const deleteConsultive = makeDeleteConsultiveUseCase();

    await deleteConsultive.execute({
      consultiveId,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
