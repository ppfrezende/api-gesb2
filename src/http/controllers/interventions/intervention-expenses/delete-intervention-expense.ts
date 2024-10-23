import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteInterventionExpenseUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-delete-intervention-expense-use-case';

export async function deleteInterventionExpense(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteInterventionExpenseQuerySchema = z.object({
    interventionExpenseId: z.string(),
  });

  const { interventionExpenseId } = deleteInterventionExpenseQuerySchema.parse(
    request.params,
  );

  try {
    const deleteInterventionExpenseUseCase =
      makeDeleteInterventionExpenseUseCase();

    await deleteInterventionExpenseUseCase.execute({
      interventionExpenseId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
