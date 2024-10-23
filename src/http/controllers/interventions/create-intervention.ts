import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-create-intervention-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';

export async function createIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createInterventionBodySchema = z.object({
    progressive: z.string(),
    intervention_number: z.string(),
    customer_po_number: z.string(),
    job_number: z.string(),
    isMonthly: z.boolean(),
    initial_at: z.coerce.date(),
    finished_at: z.coerce.date().or(z.string().max(0)),
    technicianId: z.string(),
    siteId: z.string(),
    customerId: z.string(),
    customerProjectManagerId: z.string(),
    billingOrderId: z.string().nullable(),
    total_value: z.number().nullable(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    progressive,
    intervention_number,
    customer_po_number,
    job_number,
    isMonthly,
    initial_at,
    finished_at,
    technicianId,
    siteId,
    customerId,
    customerProjectManagerId,
    billingOrderId,
    total_value,
  } = createInterventionBodySchema.parse(request.body);

  try {
    const createIntervention = makeCreateInterventionUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();

    await updateTechnician.execute({
      technicianId: technicianId,
      data: {
        sites: {
          connect: {
            id: siteId,
          },
        },
      },
    });

    const { intervention } = await createIntervention.execute({
      progressive,
      intervention_number,
      customer_po_number,
      job_number,
      isMonthly,
      initial_at,
      finished_at,
      technicianId,
      siteId,
      customerId,
      customerProjectManagerId,
      billingOrderId,
      total_value,
      userName: user.name,
    });

    return reply.status(201).send({
      intervention,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
