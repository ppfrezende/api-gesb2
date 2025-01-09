import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeSearchCustomersUseCase } from '@/use-cases/_factories/customers_factories/make-search-customers-use-case';

export async function searchCustomers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchCustomersQuerySchema = z.object({
    q: z.string().nonempty(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchCustomersQuerySchema.parse(request.query);

  try {
    const searchCustomersUseCase = makeSearchCustomersUseCase();

    const { numberOfRegisters, customers } =
      await searchCustomersUseCase.execute({
        query: q,
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-page-count': numberOfRegisters })
      .send({ customers });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
