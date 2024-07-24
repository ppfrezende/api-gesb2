import { makeCreateExpensesUseCase } from '@/use-cases/_factories/expenses_factories/make-create-expenses-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function createExpensesByIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase();
  const getInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const createExpenseBodySchema = z.object({
    expenseArray: z.array(
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

  const { interventionId } = getInterventionQuerySchema.parse(request.params);

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const { expenseArray } = createExpenseBodySchema.parse(request.body);

  try {
    const createExpensesUseCase = makeCreateExpensesUseCase();

    const expensesData = expenseArray.map((expense) => ({
      ...expense,
      expense_date: new Date(expense.expense_date),
      total_converted: (expense.expense_value * expense.currency_quote) / 100,
      interventionId,
      userName: user.name,
    }));

    const createdExpenses = await createExpensesUseCase.execute(expensesData);

    return reply.status(201).send(createdExpenses);
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
