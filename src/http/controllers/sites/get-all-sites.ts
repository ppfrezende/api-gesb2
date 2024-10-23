import { FastifyRequest, FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetAllSitesListUseCase } from '@/use-cases/_factories/sites_factories/make-get-all-sites-use-case';

export async function getAllSitesList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllSitesList = makeGetAllSitesListUseCase();

    const { totalCount, sites } = await getAllSitesList.execute();

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
