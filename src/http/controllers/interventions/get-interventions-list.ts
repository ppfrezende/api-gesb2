import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetInterventionsListUseCase } from '@/use-cases/_factories/interventions_factories/make-get-interventions-list-use-case';

export async function getInterventionsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInterventionQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getInterventionQuerySchema.parse(request.params);

  try {
    const getInterventionsList = makeGetInterventionsListUseCase();

    const { interventions, numberOfRegisters } =
      await getInterventionsList.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })
      .send({ interventions });
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
