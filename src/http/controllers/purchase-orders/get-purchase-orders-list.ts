import { makeGetPurchaseOrdersListUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-get-purchase-orders-list-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function getPurchaseOrdersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPurchaseOrdersListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getPurchaseOrdersListQuerySchema.parse(request.params);

  try {
    const getPurchaseOrdersListUseCase = makeGetPurchaseOrdersListUseCase();

    const { purchase_orders, numberOfRegisters } =
      await getPurchaseOrdersListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ purchase_orders });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
