import { makeSearchPurchaseOrdersUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-search-purchase-orders-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function searchPurchaseOrders(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPurchaseOrdersQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchPurchaseOrdersQuerySchema.parse(request.params);

  try {
    const searchPurchaseOrdersUseCase = makeSearchPurchaseOrdersUseCase();

    const purchase_orders = await searchPurchaseOrdersUseCase.execute({
      query: q,
      page,
    });

    return reply.status(200).send({ purchase_orders });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
