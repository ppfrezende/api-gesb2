import { makeGetInterventionByTechUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-tech-use-case';
import { makeDeleteSelfEmployedUseCase } from '@/use-cases/_factories/self-employees_factories/make-delete-self-employed-use-case';
import { makeDeleteTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-delete-technician-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteSelfEmployedProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteSelfEmployedProfileQuerySchema = z.object({
    selfEmployedId: z.string(),
  });

  const { selfEmployedId } = deleteSelfEmployedProfileQuerySchema.parse(
    request.params,
  );

  try {
    const deleteSelfEmployedProfile = makeDeleteSelfEmployedUseCase();
    const getInterventionByTechUseCase = makeGetInterventionByTechUseCase();
    const deleteTechnicianUseCase = makeDeleteTechnicianUseCase();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const isLinked = await getInterventionByTechUseCase.execute({
      technicianId: selfEmployedId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteSelfEmployedProfile.execute({
        selfEmployedId: selfEmployedId,
        deletedBy: userLoggedIn.name,
      });

      await deleteTechnicianUseCase.execute({
        technicianId: selfEmployedId,
        deletedBy: userLoggedIn.name,
      });
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
