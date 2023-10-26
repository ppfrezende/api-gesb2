import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetCustomerUseCase } from '@/use-cases/_factories/customers_factories/make-get-customer-use-case';

export async function getCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCustomerQuerySchema = z.object({
    customerId: z.string(),
  });

  const { customerId } = getCustomerQuerySchema.parse(request.params);

  try {
    const getCustomerUseCase = makeGetCustomerUseCase();

    const { customer } = await getCustomerUseCase.execute({
      customerId,
    });

    return reply.status(200).send({ customer });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
