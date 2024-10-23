import { makeGetTechnicianExpensesListByTechnicianIdUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-get-technician-expenses-list-by-technician-id-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getTechnicianExpensesListByTechnicianId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTechnicianExpensesListByTechnicianIdQueryParams = z.object({
    technicianId: z.string(),
  });

  const getTechnicianExpensesListByTechnicianIdQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getTechnicianExpensesListByTechnicianIdQuerySchema.parse(
    request.query,
  );

  const { technicianId } =
    getTechnicianExpensesListByTechnicianIdQueryParams.parse(request.params);

  try {
    const getTechnicianExpensesListByTechnicianIdUseCase =
      makeGetTechnicianExpensesListByTechnicianIdUseCase();

    const { technicianExpenses, numberOfRegisters } =
      await getTechnicianExpensesListByTechnicianIdUseCase.execute({
        technicianId,
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
