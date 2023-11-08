import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateInterventions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateInterventionBodySchema = z.object({
    progressive: z.string().optional(),
    intervention_number: z.string().optional(),
    po_number: z.string().optional(),
    job_number: z.string().optional(),
    isOffshore: z.boolean().optional(),
    initial_at: z.coerce.date().optional(),
    finished_at: z.coerce.date().or(z.string().max(0)),
    technicianId: z.string().optional(),
    siteId: z.string().optional(),
    customerId: z.string().optional(),
    customerProjectManagerId: z.string().optional(),
    purchaseOrderId: z.string().optional(),
  });
  const updateInterventionQuerySchema = z.object({
    interventionId: z.string(),
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
    purchaseOrderId,
    siteId,
  } = updateInterventionBodySchema.parse(request.body);

  const { interventionId } = updateInterventionQuerySchema.parse(
    request.params,
  );

  try {
    const updateInterventionUseCase = makeUpdateInterventionUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();
    const getIntervention = makeGetInterventionUseCase();

    const { intervention } = await getIntervention.execute({ interventionId });
    const oldTechnicianId = intervention.technicianId;

    if (technicianId && technicianId !== oldTechnicianId) {
      await updateTechnician.execute({
        technicianId: oldTechnicianId!,
        data: {
          sites: {
            disconnect: {
              id: intervention.siteId!,
            },
          },
        },
      });
      await updateTechnician.execute({
        technicianId: technicianId,
        data: {
          sites: {
            connect: {
              id: intervention.siteId!,
            },
          },
        },
      });
    }

    const { updatedIntervention } = await updateInterventionUseCase.execute({
      interventionId: interventionId,
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
        purchaseOrderId,
      },
    });

    return reply.status(200).send(updatedIntervention);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
