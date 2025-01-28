import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetSelfEmployeesListUseCase } from '@/use-cases/_factories/self-employees_factories/make-get-self-employees-list-use-case';

export async function getSelfEmployeesList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getSelfEmployeesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    isActive: z.string(),
  });

  const { isActive, page } = getSelfEmployeesQuerySchema.parse(request.query);

  try {
    const getSelfEmployeesListUseCase = makeGetSelfEmployeesListUseCase();

    const isActiveFilter = isActive === 'true';

    const { self_employees, numberOfRegisters, totalCount } =
      await getSelfEmployeesListUseCase.execute({
        page,
        isActive: isActiveFilter,
      });

    return reply
      .status(200)
      .headers({ 'x-page-count': numberOfRegisters })
      .headers({ 'x-total-count': totalCount })

      .send({ self_employees });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
