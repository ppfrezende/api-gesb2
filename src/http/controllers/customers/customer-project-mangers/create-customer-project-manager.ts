import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateProjectManagerUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-create-project-manager-use-case';

export async function createCustomerProjectManager(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCustomerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    job_title: z.string(),
    phone: z.string(),
  });

  const createCustomerQuerySchema = z.object({
    customerId: z.string(),
  });

  const { name, email, job_title, phone } = createCustomerBodySchema.parse(
    request.body,
  );

  const { customerId } = createCustomerQuerySchema.parse(request.params);

  try {
    const createProjectManager = makeCreateProjectManagerUseCase();

    const { project_manager } = await createProjectManager.execute({
      customerId,
      name,
      email,
      job_title,
      phone,
    });

    return reply.status(201).send({
      project_manager,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
