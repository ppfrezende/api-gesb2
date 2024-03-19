import { makeGetExpensesListByTechIdUseCase } from '@/use-cases/_factories/expenses_factories/make-get-expenses-list-by-tech-id-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getExpensesByTechId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getExpensesByTechIdQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const getExpensesByTechIdQueryParamSchema = z.object({
    technicianId: z.string(),
  });

  const { page } = getExpensesByTechIdQuerySchema.parse(request.query);

  const { technicianId } = getExpensesByTechIdQueryParamSchema.parse(
    request.params,
  );

  try {
    const getExpensesByTechIdUseCase = makeGetExpensesListByTechIdUseCase();

    const { expenses, numberOfRegisters } =
      await getExpensesByTechIdUseCase.execute({
        technicianId,
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ expenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
