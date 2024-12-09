import { FastifyRequest, FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetAllSitesTrashListUseCase } from '@/use-cases/_factories/sites_factories/make-get-all-sites-trash-use-case';

export async function getAllSitesTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllSitesTrashList = makeGetAllSitesTrashListUseCase();

    const { totalCount, sites } = await getAllSitesTrashList.execute();

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })
      .send({ sites });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
