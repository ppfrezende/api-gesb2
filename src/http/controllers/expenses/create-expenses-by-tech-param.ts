import { makeCreateExpensesUseCase } from '@/use-cases/_factories/expenses_factories/make-create-expenses-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function createExpensesByTechParam(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase();
  const getTechnicianQuerySchema = z.object({
    technicianId: z.string(),
  });

  const createExpenseBodySchema = z.object({
    expenseArray: z.array(
      z.object({
        expense_date: z.date().or(z.string()),
        type: z.string(),
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

  const { expenseArray } = createExpenseBodySchema.parse(request.body);

  try {
    const createExpensesUseCase = makeCreateExpensesUseCase();

    const expensesData = expenseArray.map((expense) => ({
      ...expense,
      total_converted: expense.expense_value * expense.currency_quote,
      technicianId,
      userName: user.name,
    }));

    const createdExpenses = await createExpensesUseCase.execute(expensesData);

    return reply.status(201).send(createdExpenses);
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}