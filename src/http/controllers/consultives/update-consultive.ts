import { makeGetConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-get-consultive-use-case';
import { makeUpdateConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-update-consultive-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateConsultive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateConsultiveBodySchema = z.object({
    progressive: z.string().optional(),
    intervention_number: z.string().optional(),
    po_number: z.string().optional(),
    job_number: z.string().optional(),
    isOffshore: z.boolean().optional(),
    initial_at: z.coerce.date().optional(),
    finished_at: z.coerce.date().optional(),
    technicianId: z.string().optional(),
    siteId: z.string().optional(),
    customerId: z.string().optional(),
    customerProjectManagerId: z.string().optional(),
  });
  const updateConsultiveQuerySchema = z.object({
    consultiveId: z.string(),
  });

  const {
    progressive,
    intervention_number,
    po_number,
    job_number,
    isOffshore,
    initial_at,
    finished_at,
    technicianId,
    customerId,
    customerProjectManagerId,
    siteId,
  } = updateConsultiveBodySchema.parse(request.body);

  const { consultiveId } = updateConsultiveQuerySchema.parse(request.params);

  try {
    const updateConsultiveUseCase = makeUpdateConsultiveUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();
    const getConsultive = makeGetConsultiveUseCase();

    const { consultive } = await getConsultive.execute({ consultiveId });
    const oldTechnicianId = consultive.technicianId;

    if (technicianId && technicianId !== oldTechnicianId) {
      await updateTechnician.execute({
        technicianId: oldTechnicianId!,
        data: {
          sites: {
            disconnect: {
              id: consultive.siteId!,
            },
          },
        },
      });
      await updateTechnician.execute({
        technicianId: technicianId,
        data: {
          sites: {
            connect: {
              id: consultive.siteId!,
            },
          },
        },
      });
    }

    const { updatedConsultive } = await updateConsultiveUseCase.execute({
      consultiveId: consultiveId,
      data: {
        progressive,
        intervention_number,
        po_number,
        job_number,
        isOffshore,
        initial_at,
        finished_at,
        technicianId,
        siteId,
        customerId,
        customerProjectManagerId,
      },
    });

    return reply.status(200).send(updatedConsultive);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
