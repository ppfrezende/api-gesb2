import { makeDeleteSiteUseCase } from '@/use-cases/_factories/sites_factories/make-delete-site-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function deleteSite(request: FastifyRequest, reply: FastifyReply) {
  const deleteSiteQuerySchema = z.object({
    siteId: z.string(),
  });

  const { siteId } = deleteSiteQuerySchema.parse(request.params);

  try {
    const deleteSite = makeDeleteSiteUseCase();

    await deleteSite.execute({ siteId });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
