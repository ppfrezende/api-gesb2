import { makeGetExpensesListUseCase } from '@/use-cases/_factories/expenses_factories/make-get-expenses-list-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getAllExpenses(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllExpensesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getAllExpensesQuerySchema.parse(request.query);

  try {
    const getAllExpensesUseCase = makeGetExpensesListUseCase();

    const { expenses, numberOfRegisters } = await getAllExpensesUseCase.execute(
      {
        page,
      },
    );

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
