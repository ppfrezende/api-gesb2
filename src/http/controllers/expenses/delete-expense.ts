import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteExpenseUseCase } from '@/use-cases/_factories/expenses_factories/make-delete-expense-use-case';

export async function deleteExpense(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteExpenseQuerySchema = z.object({
    expenseId: z.string(),
  });

  const { expenseId } = deleteExpenseQuerySchema.parse(request.params);

  try {
    const deleteExpenseUseCase = makeDeleteExpenseUseCase();

    await deleteExpenseUseCase.execute({
      expenseId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
