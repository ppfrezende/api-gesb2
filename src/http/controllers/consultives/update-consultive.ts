import { makeUpdateConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-update-consultive-use-case';
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
