import { makeGetSitesListUseCase } from '@/use-cases/_factories/sites_factories/make-get-sites-list-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function getSitesList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getSitesListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getSitesListQuerySchema.parse(request.query);

  try {
    const getSitesList = makeGetSitesListUseCase();

    const { numberOfRegisters, sites } = await getSitesList.execute({ page });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })
      .send({ sites });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
