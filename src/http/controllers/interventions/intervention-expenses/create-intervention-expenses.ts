import { z } from 'zod';
import Decimal from 'decimal.js';
import { makeCreateInterventionExpensesUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-create-intervention-expenses-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function createInterventionExpenses(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase();
  const getInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const createInterventionExpensesBodySchema = z.object({
    interventionExpenseArray: z.array(
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

  const { interventionExpenseArray } =
    createInterventionExpensesBodySchema.parse(request.body);

  try {
    const createInterventionExpensesUseCase =
      makeCreateInterventionExpensesUseCase();

    const interventionExpensesData = interventionExpenseArray.map(
      (expense) => ({
        ...expense,
        currency_quote: Number(new Decimal(expense.currency_quote).toFixed(2)),
        expense_value: Number(
          new Decimal(expense.expense_value).dividedBy(100).toFixed(2),
        ),
        expense_date: new Date(expense.expense_date),
        interventionId,
        userId: user.id,
      }),
    );

    const createdInterventionExpenses =
      await createInterventionExpensesUseCase.execute(interventionExpensesData);

    return reply.status(201).send(createdInterventionExpenses);
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
