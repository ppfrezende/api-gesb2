import { makeGetTechnicianExpensesListUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-get-technician-expenses-list-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getTechnicianExpensesList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTechnicianExpensesListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getTechnicianExpensesListQuerySchema.parse(request.query);

  try {
    const getTechnicianExpensesListUseCase =
      makeGetTechnicianExpensesListUseCase();

    const { technicianExpenses, numberOfRegisters } =
      await getTechnicianExpensesListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ technicianExpenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
