import { makeGetTechnicianExpensesTrashListUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-get-all-technician-expenses-trash-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getTechnicianExpensesTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getTechnicianExpensesListUseCase =
      makeGetTechnicianExpensesTrashListUseCase();

    const { technicianExpenses, numberOfRegisters } =
      await getTechnicianExpensesListUseCase.execute();

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
