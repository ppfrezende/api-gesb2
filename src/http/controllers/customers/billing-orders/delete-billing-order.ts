import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetInterventionByBillingOrderUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-billing-order-use-case';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
import { makeDeleteBillingOrderUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-delete-billing-order-use-case';

export async function deleteBillingOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteBillingOrderQuerySchema = z.object({
    billingOrderId: z.string(),
  });

  const { billingOrderId } = deleteBillingOrderQuerySchema.parse(
    request.params,
  );

  try {
    const deleteBillingOrder = makeDeleteBillingOrderUseCase();

    const getInterventionByBillingUseCase =
      makeGetInterventionByBillingOrderUseCase();

    const isLinked = await getInterventionByBillingUseCase.execute({
      billingOrderId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteBillingOrder.execute({
        billingOrderId,
      });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ResourceCannotBeDeletedError) {
      return reply.status(403).send({ message: err.message });
    }

    throw err;
  }
}
