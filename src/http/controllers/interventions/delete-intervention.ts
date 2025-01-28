import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-delete-intervention-use-case';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function deleteIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const { interventionId } = deleteInterventionQuerySchema.parse(
    request.params,
  );

  try {
    const deleteIntervention = makeDeleteInterventionUseCase();
    const getIntervention = makeGetInterventionUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();
    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const { intervention } = await getIntervention.execute({ interventionId });

    const technicianId = intervention.technicianId;
    const siteId = intervention.siteId;

    if (technicianId && siteId) {
      await updateTechnician.execute({
        technicianId: technicianId,
        updatedBy: userLoggedIn.name,
        data: {
          sites: {
            disconnect: {
              id: siteId,
            },
          },
        },
      });
    }
    await deleteIntervention.execute({
      interventionId,
      deletedBy: userLoggedIn.name,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
