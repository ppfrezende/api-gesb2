import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetBillingOrdersListUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-get-billing-orders-list-use-case';

export async function getBillingOrdersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getBillingOrdersListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getBillingOrdersListQuerySchema.parse(request.query);

  try {
    const getBillingOrdersListUseCase = makeGetBillingOrdersListUseCase();

    const { billing_orders, numberOfRegisters } =
      await getBillingOrdersListUseCase.execute({
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
