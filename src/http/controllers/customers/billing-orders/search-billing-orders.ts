import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeSearchBillingOrdersUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-search-billing-orders-use-case';

export async function searchBillingOrders(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchBillingOrdersQuerySchema = z.object({
    q: z.string().nonempty(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchBillingOrdersQuerySchema.parse(request.query);

  try {
    const searchBillingOrdersUseCase = makeSearchBillingOrdersUseCase();

    const { billing_orders, numberOfRegisters } =
      await searchBillingOrdersUseCase.execute({
        query: q,
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })
      .send({ billing_orders });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
