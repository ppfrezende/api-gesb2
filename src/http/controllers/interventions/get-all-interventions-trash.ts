import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetAllInterventionsTrashListUseCase } from '@/use-cases/_factories/interventions_factories/make-get-all-interventions-trash-use-case';

export async function getAllInterventionsTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllInterventionsTrashListUseCase =
      makeGetAllInterventionsTrashListUseCase();

    const { interventions, totalCount } =
      await getAllInterventionsTrashListUseCase.execute();

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
