import { makeUpdateBillingOrderUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-update-purchase-order-use-case';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';
import { makeUpdateSiteUseCase } from '@/use-cases/_factories/sites_factories/make-update-site-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
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
    billingOrderId: z.string().optional().nullable(),
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
    billingOrderId,
    siteId,
  } = updateInterventionBodySchema.parse(request.body);

  const { interventionId } = updateInterventionQuerySchema.parse(
    request.params,
  );

  try {
    const updateInterventionUseCase = makeUpdateInterventionUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();
    const updateSite = makeUpdateSiteUseCase();
    const updateBillingOrder = makeUpdateBillingOrderUseCase();
    const getIntervention = makeGetInterventionUseCase();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const { intervention } = await getIntervention.execute({ interventionId });
    const oldTechnicianId = intervention.technicianId;
    const oldSiteId = intervention.siteId;
    const oldBillingOrderId = intervention.billingOrderId;

    if (billingOrderId && billingOrderId !== oldBillingOrderId) {
      await updateBillingOrder.execute({
        billingOrderId: billingOrderId,
        updatedBy: userLoggedIn.name,
        data: {
          interventions: {
            connect: {
              id: intervention.id,
            },
          },
        },
      });
    } else if (billingOrderId === null) {
      await updateBillingOrder.execute({
        billingOrderId: intervention.billingOrderId!,
        updatedBy: userLoggedIn.name,
        data: {
          interventions: {
            disconnect: {
              id: intervention.id!,
            },
          },
        },
      });
    }

    if (technicianId && technicianId !== oldTechnicianId) {
      await updateSite.execute({
        siteId: intervention.siteId!,
        updatedBy: userLoggedIn.name,
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
        updatedBy: userLoggedIn.name,
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
          updatedBy: userLoggedIn.name,
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
      updatedBy: userLoggedIn.name,
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
