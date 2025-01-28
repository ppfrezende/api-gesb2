import { makeCreateTechnicianExpensesUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-create-technician-expenses-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function createTechnicianExpenses(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase();
  const getTechnicianQuerySchema = z.object({
    technicianId: z.string(),
  });

  const createTechnicianExpensesBodySchema = z.object({
    technicianExpenseArray: z.array(
      z.object({
        expense_date: z.date().or(z.string()),
        expense_type: z.string(),
        description: z.string(),
        currency: z.string(),
        currency_quote: z.number(),
        expense_value: z.number(),
      }),
    ),
  });

  const { technicianId } = getTechnicianQuerySchema.parse(request.params);

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const { technicianExpenseArray } = createTechnicianExpensesBodySchema.parse(
    request.body,
  );

  try {
    const createTechnicianExpensesUseCase =
      makeCreateTechnicianExpensesUseCase();

    const technicianExpensesData = technicianExpenseArray.map((expense) => ({
      ...expense,
      expense_date: new Date(expense.expense_date),
      technicianId,
      userId: user.id,
    }));

    const createdTechnicianExpenses =
      await createTechnicianExpensesUseCase.execute(technicianExpensesData);

    return reply.status(201).send(createdTechnicianExpenses);
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
