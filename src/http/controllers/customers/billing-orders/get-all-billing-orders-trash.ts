import { FastifyRequest, FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetBillingOrdersTrashListUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-get-all-billing-orders-trash-use-case';

export async function getBillingOrdersTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getBillingOrdersTrashListUseCase =
      makeGetBillingOrdersTrashListUseCase();

    const { billing_orders, numberOfRegisters } =
      await getBillingOrdersTrashListUseCase.execute();

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
