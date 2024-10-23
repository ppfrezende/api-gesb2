import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetAllTechniciansListUseCase } from '@/use-cases/_factories/technicians_factories/make-get-all-technicians-use-case';

export async function getAllTechniciansList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllTechniciansListUseCase = makeGetAllTechniciansListUseCase();

    const { allTechnicians, totalCount } =
      await getAllTechniciansListUseCase.execute();

    return reply
      .status(200)
      .headers({
        'x-total-count': totalCount,
      })

      .send({ allTechnicians });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
