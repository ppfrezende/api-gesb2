import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeCreateSiteUseCase } from '@/use-cases/_factories/sites_factories/make-create-site-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function createSite(request: FastifyRequest, reply: FastifyReply) {
  const createSiteBodySchema = z.object({
    description: z.string(),
    on_offshore: z.boolean(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const { description, on_offshore } = createSiteBodySchema.parse(request.body);

  try {
    const createSite = makeCreateSiteUseCase();

    const { site } = await createSite.execute({
      description,
      on_offshore,
      userEmail: user.email,
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
