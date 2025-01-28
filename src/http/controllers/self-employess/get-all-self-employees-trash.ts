import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetSelfEmployeesTrashUseCase } from '@/use-cases/_factories/self-employees_factories/make-get-all-self-employees-trash-use-case';

export async function getSelfEmployeesTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getSelfEmployeesTrashListUseCase = makeGetSelfEmployeesTrashUseCase();

    const { self_employees, totalCount } =
      await getSelfEmployeesTrashListUseCase.execute();

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })

      .send({ self_employees });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
