import { FastifyRequest, FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetAllCustomersTrashListUseCase } from '@/use-cases/_factories/customers_factories/make-get-all-customers-trash-use-case';

export async function getAllCustomersTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllCustomersTrashListUseCase =
      makeGetAllCustomersTrashListUseCase();

    const { customers, totalCount } =
      await getAllCustomersTrashListUseCase.execute();

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
