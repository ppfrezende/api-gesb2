import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-delete-consultive-use-case';
import { makeGetConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-get-consultive-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';

export async function deleteConsultive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteConsultiveQuerySchema = z.object({
    consultiveId: z.string(),
  });

  const { consultiveId } = deleteConsultiveQuerySchema.parse(request.params);

  try {
    const deleteConsultive = makeDeleteConsultiveUseCase();
    const getConsultive = makeGetConsultiveUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();

    const { consultive } = await getConsultive.execute({ consultiveId });

    const technicianId = consultive.technicianId;
    const siteId = consultive.siteId;

    if (technicianId && siteId) {
      await updateTechnician.execute({
        technicianId: technicianId,
        data: {
          sites: {
            disconnect: {
              id: siteId,
            },
          },
        },
      });
    }
    await deleteConsultive.execute({
      consultiveId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
