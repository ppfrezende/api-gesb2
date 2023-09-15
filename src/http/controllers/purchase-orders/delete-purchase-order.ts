import { makeDeletePurchaseOrderUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-delete-purchase-order-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function deletePurchaseOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deletePurchaseOrderQuerySchema = z.object({
    purchaseOrderId: z.string(),
  });

  const { purchaseOrderId } = deletePurchaseOrderQuerySchema.parse(
    request.params,
  );

  try {
    const deletePurchaseOrder = makeDeletePurchaseOrderUseCase();

    await deletePurchaseOrder.execute({
      purchaseOrderId,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
