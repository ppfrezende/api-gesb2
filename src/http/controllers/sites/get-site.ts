import { makeGetSiteUseCase } from '@/use-cases/_factories/sites_factories/make-get-site-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function getSite(request: FastifyRequest, reply: FastifyReply) {
  const getSiteQuerySchema = z.object({
    siteId: z.string(),
  });

  const { siteId } = getSiteQuerySchema.parse(request.params);

  try {
    const getSite = makeGetSiteUseCase();

    const { site } = await getSite.execute({ siteId });

    return reply.status(201).send({ site });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
