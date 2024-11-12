import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetAllInterventionsListUseCase } from '@/use-cases/_factories/interventions_factories/make-get-all-interventions-use-case';

export async function getAllInterventionsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllInterventionsListUseCase = makeGetAllInterventionsListUseCase();

    const { interventions, totalCount } =
      await getAllInterventionsListUseCase.execute();

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })

      .send({ interventions });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
