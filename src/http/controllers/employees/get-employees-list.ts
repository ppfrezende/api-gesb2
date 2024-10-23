import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetEmployeesListUserCase } from '@/use-cases/_factories/employee_factories/make-get-employees-list-use-case';

export async function getEmployeesList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEmployeesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getEmployeesQuerySchema.parse(request.query);

  try {
    const getEmployeesListUseCase = makeGetEmployeesListUserCase();

    const { employees, numberOfRegisters, totalCount } =
      await getEmployeesListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })
      .headers({ 'x-page-count': numberOfRegisters })

      .send({ employees });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
