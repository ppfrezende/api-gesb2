import { makeSearchSitesUseCase } from '@/use-cases/_factories/sites_factories/make-search-sites-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function searchSites(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchSitesQuerySchema = z.object({
    q: z.string().nonempty(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchSitesQuerySchema.parse(request.query);

  try {
    const searchSites = makeSearchSitesUseCase();

    const { numberOfRegisters, sites } = await searchSites.execute({
      query: q,
      page,
    });

    return reply
      .status(201)
      .headers({ 'x-page-count': numberOfRegisters })
      .send({ sites });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
