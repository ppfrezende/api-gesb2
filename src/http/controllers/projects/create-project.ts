import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeCreateProjectUseCase } from '@/use-cases/_factories/project-factories/make-create-project-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function createProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerProjectBodySchema = z.object({
    purchase_order: z.string(),
    title: z.string(),
    customer: z.string(),
    customer_email: z.string().email(),
    description: z.string(),
    initial_at: z.coerce.date(),
    finished_at: z.coerce.date().optional(),
    site: z.string(),
    estimate: z.number(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    purchase_order,
    title,
    customer,
    customer_email,
    description,
    initial_at,
    finished_at,
    site,
    estimate,
  } = registerProjectBodySchema.parse(request.body);

  try {
    const createProject = makeCreateProjectUseCase();

    const { project } = await createProject.execute({
      purchase_order,
      title,
      customer,
      customer_email,
      description,
      initial_at,
      finished_at,
      site,
      estimate,
      userEmail: user.email,
    });

    return reply.status(201).send({
      project,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
