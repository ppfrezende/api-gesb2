import { makeDeleteSiteUseCase } from '@/use-cases/_factories/sites_factories/make-delete-site-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetInterventionBySiteUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-site-use-case';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function deleteSite(request: FastifyRequest, reply: FastifyReply) {
  const deleteSiteQuerySchema = z.object({
    siteId: z.string(),
  });

  const { siteId } = deleteSiteQuerySchema.parse(request.params);

  try {
    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });
    const deleteSite = makeDeleteSiteUseCase();
    const getInterventionBySiteUseCase = makeGetInterventionBySiteUseCase();

    const isLinked = await getInterventionBySiteUseCase.execute({
      siteId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteSite.execute({ siteId, deletedBy: userLoggedIn.name });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ResourceCannotBeDeletedError) {
      return reply.status(403).send({ message: err.message });
    }

    throw err;
  }
}
