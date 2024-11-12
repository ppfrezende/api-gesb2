import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';
import { makeUpdateSiteUseCase } from '@/use-cases/_factories/sites_factories/make-update-site-use-case';
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
    customer_po_number: z.string().optional(),
    job_number: z.string().optional(),
    initial_at: z.coerce.date().optional(),
    finished_at: z.coerce.date().or(z.string().max(0)).optional(),
    technicianId: z.string().optional(),
    siteId: z.string().optional(),
    customerProjectManagerId: z.string().optional(),
  });
  const updateInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const {
    progressive,
    intervention_number,
    customer_po_number,
    job_number,
    initial_at,
    finished_at,
    technicianId,
    customerProjectManagerId,
    siteId,
  } = updateInterventionBodySchema.parse(request.body);

  const { interventionId } = updateInterventionQuerySchema.parse(
    request.params,
  );

  try {
    const updateInterventionUseCase = makeUpdateInterventionUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();
    const updateSite = makeUpdateSiteUseCase();
    const getIntervention = makeGetInterventionUseCase();

    const { intervention } = await getIntervention.execute({ interventionId });
    const oldTechnicianId = intervention.technicianId;
    const oldSiteId = intervention.siteId;

    if (technicianId && technicianId !== oldTechnicianId) {
      await updateSite.execute({
        siteId: intervention.siteId!,
        data: {
          technicians: {
            disconnect: {
              id: oldTechnicianId!,
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

      if (siteId && siteId !== oldSiteId) {
        await updateTechnician.execute({
          technicianId: technicianId,
          data: {
            sites: {
              disconnect: {
                id: intervention.siteId!,
              },
              connect: {
                id: siteId,
              },
            },
          },
        });
      }
    }

    const { updatedIntervention } = await updateInterventionUseCase.execute({
      interventionId: interventionId,
      data: {
        progressive,
        intervention_number,
        customer_po_number,
        job_number,
        initial_at,
        finished_at,
        technicianId,
        customerProjectManagerId,
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
