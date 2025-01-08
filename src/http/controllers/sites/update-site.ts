import { makeUpdateSiteUseCase } from '@/use-cases/_factories/sites_factories/make-update-site-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function updateSite(request: FastifyRequest, reply: FastifyReply) {
  const updateSiteBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    operation_zone: z.string().optional(),
    emergency_phone: z.string().optional(),
    emergency_email: z.string().optional(),
    administrator_name: z.string().optional(),
    administrator_phone: z.string().optional(),
    administrator_email: z.string().optional(),
    isOffshore: z.boolean().optional(),
  });

  const updateSiteQuerySchema = z.object({
    siteId: z.string(),
  });

  const {
    name,
    description,
    operation_zone,
    emergency_email,
    emergency_phone,
    administrator_email,
    administrator_name,
    administrator_phone,
    isOffshore,
  } = updateSiteBodySchema.parse(request.body);

  const { siteId } = updateSiteQuerySchema.parse(request.params);

  try {
    const updateSite = makeUpdateSiteUseCase();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const { updatedSite } = await updateSite.execute({
      siteId: siteId,
      updatedBy: userLoggedIn.name,
      data: {
        name,
        description,
        operation_zone,
        emergency_email,
        emergency_phone,
        administrator_email,
        administrator_name,
        administrator_phone,
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
