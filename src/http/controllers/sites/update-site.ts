import { makeUpdateSiteUseCase } from '@/use-cases/_factories/sites_factories/make-update-site-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function updateSite(request: FastifyRequest, reply: FastifyReply) {
  const updateSiteBodySchema = z.object({
    description: z.string().optional(),
    isOffshore: z.boolean().optional(),
  });

  const updateSiteQuerySchema = z.object({
    siteId: z.string(),
  });

  const { description, isOffshore } = updateSiteBodySchema.parse(request.body);

  const { siteId } = updateSiteQuerySchema.parse(request.params);

  try {
    const updateSite = makeUpdateSiteUseCase();

    const updatedSite = await updateSite.execute({
      siteId: siteId,
      data: {
        description,
        isOffshore,
      },
    });

    return reply.status(201).send({
      updatedSite,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
