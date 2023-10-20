import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateConsultiveUseCase } from '@/use-cases/_factories/consultives_factories/make-create-consultive-use-case';

export async function createConsultive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createConsultiveBodySchema = z.object({
    progressive: z.string(),
    intervention_number: z.string(),
    po_number: z.string(),
    job_number: z.string(),
    isOffshore: z.boolean(),
    initial_at: z.coerce.date(),
    finished_at: z.coerce.date(),
    technicianId: z.string(),
    siteId: z.string(),
    customerId: z.string(),
    customerProjectManagerId: z.string(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
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
    siteId,
    customerId,
    customerProjectManagerId,
  } = createConsultiveBodySchema.parse(request.body);

  try {
    const createConsultive = makeCreateConsultiveUseCase();

    const { consultive } = await createConsultive.execute({
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
      userName: user.name,
    });

    return reply.status(201).send({
      consultive,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
