import { makeGetMonthlyTechniciansExpensesTotalValueUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-get-total-monthly-technicians-expenses-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getMonthlyTechniciansExpensesTotalValue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMonthlyTechniciansExpensesTotalValueQuerySchema = z.object({
    year: z.coerce.number().min(0).default(0),
    month: z.coerce.number().min(0).default(0),
  });

  const { year, month } =
    getMonthlyTechniciansExpensesTotalValueQuerySchema.parse(request.query);

  try {
    const getMonthlyTechniciansExpensesTotalValueUseCase =
      makeGetMonthlyTechniciansExpensesTotalValueUseCase();

    const { totalMonthlyTechniciansExpenses } =
      await getMonthlyTechniciansExpensesTotalValueUseCase.execute({
        year,
        month,
      });

    return reply
      .status(200)
      .headers({ 'x-month-value': totalMonthlyTechniciansExpenses })

      .send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
