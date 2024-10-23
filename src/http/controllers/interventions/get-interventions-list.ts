import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetInterventionsListUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-list-use-case';

export async function getInterventionsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInterventionsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getInterventionsQuerySchema.parse(request.query);

  try {
    const getInterventionsListUseCase = makeGetInterventionsListUseCase();

    const { interventions, numberOfRegisters, totalCount } =
      await getInterventionsListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-page-count': numberOfRegisters })
      .headers({ 'x-total-count': totalCount })

      .send({ interventions });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
