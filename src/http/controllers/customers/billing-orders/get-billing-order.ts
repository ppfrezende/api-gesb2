import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetBillingOrderUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-get-billing-order-use-case';

export async function getBillingOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getBillingOrderQuerySchema = z.object({
    billingOrderId: z.string(),
  });

  const { billingOrderId } = getBillingOrderQuerySchema.parse(request.params);

  try {
    const getBillingOrder = makeGetBillingOrderUseCase();

    const billing_order = await getBillingOrder.execute({
      billingOrderId,
    });

    return reply.status(200).send(billing_order);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
