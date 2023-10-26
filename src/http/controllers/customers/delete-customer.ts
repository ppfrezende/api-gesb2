import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteCustomerUseCase } from '@/use-cases/_factories/customers_factories/make-delete-customer-use-case';

export async function deleteCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCustomerQuerySchema = z.object({
    customerId: z.string(),
  });

  const { customerId } = deleteCustomerQuerySchema.parse(request.params);

  try {
    const deleteCustomer = makeDeleteCustomerUseCase();

    await deleteCustomer.execute({
      customerId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
