import { makeUpdateProjectUseCase } from '@/use-cases/_factories/project-factories/make-update-project-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProjectBodySchema = z.object({
    purchase_order: z.string().optional(),
    customer: z.string().optional(),
    customer_email: z.string().email().optional(),
    description: z.string().optional(),
    initial_at: z.coerce.date().optional(),
    finished_at: z.coerce.date().optional(),
    site: z.string().optional(),
    estimate: z.number().optional(),
  });
  const updateProjectQuerySchema = z.object({
    projectId: z.string(),
  });

  const {
    purchase_order,
    customer,
    customer_email,
    description,
    initial_at,
    finished_at,
    site,
    estimate,
  } = updateProjectBodySchema.parse(request.body);

  const { projectId } = updateProjectQuerySchema.parse(request.params);

  try {
    const updateProject = makeUpdateProjectUseCase();

    const updatedProject = await updateProject.execute({
      projectId: projectId,
      data: {
        purchase_order,
        customer,
        customer_email,
        description,
        initial_at,
        finished_at,
        site,
        estimate,
      },
    });

    return reply.status(200).send(updatedProject);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
