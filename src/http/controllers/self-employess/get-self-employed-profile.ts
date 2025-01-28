import { makeGetSelfEmployedProfileUseCase } from '@/use-cases/_factories/self-employees_factories/make-get-self-employed-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getSelfEmployedProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getSelfEmployedProfileQuerySchema = z.object({
    selfEmployedId: z.string(),
  });

  const { selfEmployedId } = getSelfEmployedProfileQuerySchema.parse(
    request.params,
  );
  try {
    const getSelfEmplyedProfile = makeGetSelfEmployedProfileUseCase();

    const { self_employed } = await getSelfEmplyedProfile.execute({
      selfEmployedId: selfEmployedId,
    });

    return reply.status(200).send({
      self_employed,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
