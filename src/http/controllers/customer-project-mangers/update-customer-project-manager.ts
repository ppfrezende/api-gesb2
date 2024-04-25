import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateProjectManagerUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-update-project-manager-use-case';

export async function updateCustomerProjectManager(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCustomerProjectManagerBodySchema = z.object({
    name: z.string().optional(),
  });

  const updateCustomerProjectManagerQuerySchema = z.object({
    customerProjectManagerId: z.string(),
  });

  const { name } = updateCustomerProjectManagerBodySchema.parse(request.body);

  const { customerProjectManagerId } =
    updateCustomerProjectManagerQuerySchema.parse(request.params);

  try {
    const updateCustomerProjectManagerUseCase =
      makeUpdateProjectManagerUseCase();

    const updatedCustomer = await updateCustomerProjectManagerUseCase.execute({
      customerProjectManagerId,
      data: {
        name,
      },
    });

    return reply.status(201).send(updatedCustomer);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
