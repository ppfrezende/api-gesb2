import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetEmployeesTrashUseCase } from '@/use-cases/_factories/employee_factories/make-get-all-employees-trash-use-case';

export async function getEmployeesTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getEmployeesTrashListUseCase = makeGetEmployeesTrashUseCase();

    const { employees, totalCount } =
      await getEmployeesTrashListUseCase.execute();

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })

      .send({ employees });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
