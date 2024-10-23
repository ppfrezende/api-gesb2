import { FastifyRequest, FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetAllCustomersListUseCase } from '@/use-cases/_factories/customers_factories/make-get-all-customers-use-case';

export async function getAllCustomersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllCustomersListUseCase = makeGetAllCustomersListUseCase();

    const { customers, totalCount } =
      await getAllCustomersListUseCase.execute();

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })

      .send({ customers });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
