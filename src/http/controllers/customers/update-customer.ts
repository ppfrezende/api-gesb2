import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateCustomerUseCase } from '@/use-cases/_factories/customers_factories/make-update-customer-use-case';

export async function updateCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCustomerBodySchema = z.object({
    name: z.string().optional(),
  });

  const updateCustomerQuerySchema = z.object({
    customerId: z.string(),
  });

  const { name } = updateCustomerBodySchema.parse(request.body);

  const { customerId } = updateCustomerQuerySchema.parse(request.params);

  try {
    const updateCustomer = makeUpdateCustomerUseCase();

    const updatedCustomer = await updateCustomer.execute({
      customerId: customerId,
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
