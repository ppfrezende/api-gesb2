import { makeGetPurchaseOrderUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-get-purchase-order-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function getPurchaseOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPurchaseOrderQuerySchema = z.object({
    purchaseOrderId: z.string(),
  });

  const { purchaseOrderId } = getPurchaseOrderQuerySchema.parse(request.params);

  try {
    const getPurchaseOrder = makeGetPurchaseOrderUseCase();

    const purchase_order = await getPurchaseOrder.execute({
      purchaseOrderId,
    });

    return reply.status(200).send(purchase_order);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
