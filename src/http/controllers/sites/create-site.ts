import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeCreateSiteUseCase } from '@/use-cases/_factories/sites_factories/make-create-site-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function createSite(request: FastifyRequest, reply: FastifyReply) {
  const createSiteBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    operation_zone: z.string(),
    emergency_phone: z.string(),
    emergency_email: z.string(),
    administrator_name: z.string(),
    administrator_phone: z.string(),
    administrator_email: z.string(),
    isOffshore: z.boolean(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
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
  } = createSiteBodySchema.parse(request.body);

  try {
    const createSite = makeCreateSiteUseCase();

    const { site } = await createSite.execute({
      name,
      description,
      operation_zone,
      emergency_email,
      emergency_phone,
      administrator_email,
      administrator_name,
      administrator_phone,
      isOffshore,
      userId: user.id,
    });

    return reply.status(201).send({
      site,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
