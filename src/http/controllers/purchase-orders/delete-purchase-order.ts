import { makeDeletePurchaseOrderUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-delete-purchase-order-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetInterventionByPOUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-po-use-case';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';

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

    const getInterventionByPoUseCase = makeGetInterventionByPOUseCase();

    const isLinked = await getInterventionByPoUseCase.execute({
      purchaseOrderId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deletePurchaseOrder.execute({
        purchaseOrderId,
      });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ResourceCannotBeDeletedError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
