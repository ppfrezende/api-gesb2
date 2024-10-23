import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteTechnicianExpenseUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-delete-technician-expense-use-case';

export async function deleteTechnicianExpense(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteTechnicianExpenseQuerySchema = z.object({
    technicianExpenseId: z.string(),
  });

  const { technicianExpenseId } = deleteTechnicianExpenseQuerySchema.parse(
    request.params,
  );

  try {
    const deleteTechnicianExpenseUseCase = makeDeleteTechnicianExpenseUseCase();

    await deleteTechnicianExpenseUseCase.execute({
      technicianExpenseId,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
