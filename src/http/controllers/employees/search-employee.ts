import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeSearchEmployeeUseCase } from '@/use-cases/_factories/employee_factories/make-search-employee-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function searchEmployees(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchEmployeesQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchEmployeesQuerySchema.parse(request.query);

  try {
    const searchEmployeeUseCase = makeSearchEmployeeUseCase();

    const { employees, numberOfRegisters } =
      await searchEmployeeUseCase.execute({
        query: q,
        page,
      });

    return reply
      .status(200)
      .headers({
        'x-page-count': numberOfRegisters,
      })
      .send({ employees });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
