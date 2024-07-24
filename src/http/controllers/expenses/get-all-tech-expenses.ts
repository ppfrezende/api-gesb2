import { makeGetAllTechExpensesListUseCase } from '@/use-cases/_factories/expenses_factories/make-get-all-tech-expenses-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getAllTechExpenses(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllTechExpensesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getAllTechExpensesQuerySchema.parse(request.query);

  try {
    const getAllTechExpensesUseCase = makeGetAllTechExpensesListUseCase();

    const { expenses, numberOfRegisters } =
      await getAllTechExpensesUseCase.execute({
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
