import { makeGetInterventionByTechUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-tech-use-case';
import { makeDeleteServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-delete-service-provider-use-case';
import { makeDeleteTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-delete-technician-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteServiceProviderProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteServiceProviderProfileQuerySchema = z.object({
    serviceProviderId: z.string(),
  });

  const { serviceProviderId } = deleteServiceProviderProfileQuerySchema.parse(
    request.params,
  );

  try {
    const deleteServiceProviderProfile =
      makeDeleteServiceProviderProfileUseCase();
    const getInterventionByTechUseCase = makeGetInterventionByTechUseCase();
    const deleteTechnicianUseCase = makeDeleteTechnicianUseCase();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const isLinked = await getInterventionByTechUseCase.execute({
      technicianId: serviceProviderId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteServiceProviderProfile.execute({
        serviceProviderId: serviceProviderId,
        deletedBy: userLoggedIn.name,
      });

      await deleteTechnicianUseCase.execute({
        technicianId: serviceProviderId,
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
