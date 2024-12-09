import { FastifyRequest, FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetAllCustomerProjectManagersTrashListUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-get-all-customer-project-managers-trash-use-case';

export async function getAllCustomerProjectManagersTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllCustomerProjectManagersTrashListUseCase =
      makeGetAllCustomerProjectManagersTrashListUseCase();

    const { customerProjectManagers, totalCount } =
      await getAllCustomerProjectManagersTrashListUseCase.execute();

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })

      .send({ customerProjectManagers });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
