import { makeGetMonthlyTechniciansExpensesTotalValueUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-get-total-monthly-technicians-expenses-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getTotalEachMonthTechniciansExpenses(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTotalEachMonthTechniciansExpensesQuerySchema = z.object({
    year: z.coerce.number().min(0).default(new Date().getFullYear()),
  });

  const { year } = getTotalEachMonthTechniciansExpensesQuerySchema.parse(
    request.query,
  );

  try {
    const getMonthlyTechniciansExpensesTotalValueUseCase =
      makeGetMonthlyTechniciansExpensesTotalValueUseCase();

    const monthlyTechniciansExpenses: { [key: number]: number } = {};

    for (let month = 0; month <= 11; month++) {
      const { totalMonthlyTechniciansExpenses } =
        await getMonthlyTechniciansExpensesTotalValueUseCase.execute({
          year,
          month,
        });
      monthlyTechniciansExpenses[month] = totalMonthlyTechniciansExpenses || 0;
    }
    return reply
      .status(200)

      .send({ monthlyTechniciansExpenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
