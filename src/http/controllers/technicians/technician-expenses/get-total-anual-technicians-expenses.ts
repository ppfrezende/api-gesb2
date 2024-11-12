import { makeGetAnualTechniciansExpensesTotalValueUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-get-total-anual-technicians-expenses-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getAnualTechniciansExpensesTotalValue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAnualTechniciansExpensesTotalValueQuerySchema = z.object({
    year: z.coerce.number().min(0).default(0),
  });

  const { year } = getAnualTechniciansExpensesTotalValueQuerySchema.parse(
    request.query,
  );

  try {
    const getAnualTechniciansExpensesTotalValueUseCase =
      makeGetAnualTechniciansExpensesTotalValueUseCase();

    const { totalAnualTechniciansExpenses } =
      await getAnualTechniciansExpensesTotalValueUseCase.execute({
        year,
      });

    return reply
      .status(200)
      .headers({ 'x-year-value': totalAnualTechniciansExpenses })

      .send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
