import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeSearchSelfEmployeesUseCase } from '@/use-cases/_factories/self-employees_factories/make-search-self-employees-use-case';

export async function searchSelfEmployees(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchSelfEmployeesQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchSelfEmployeesQuerySchema.parse(request.query);

  try {
    const searchSelfEmployeesUseCase = makeSearchSelfEmployeesUseCase();

    const { self_employees, numberOfRegisters } =
      await searchSelfEmployeesUseCase.execute({
        query: q,
        page,
      });

    return reply
      .status(200)
      .headers({
        'x-page-count': numberOfRegisters,
      })
      .send({ self_employees });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
