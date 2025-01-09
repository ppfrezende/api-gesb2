import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeSearchInterventionsUseCase } from '@/use-cases/_factories/interventions_factories/make-search-interventions-use-case';

export async function searchInterventions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchInterventionsQuerySchema = z.object({
    q: z.string().nonempty(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchInterventionsQuerySchema.parse(request.query);

  try {
    const searchInterventionsUseCase = makeSearchInterventionsUseCase();

    const { interventions, numberOfRegisters } =
      await searchInterventionsUseCase.execute({
        q,
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-page-count': numberOfRegisters })

      .send({ interventions });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
