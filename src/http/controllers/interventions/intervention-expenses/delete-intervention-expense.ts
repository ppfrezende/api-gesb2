import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteInterventionExpenseUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-delete-intervention-expense-use-case';
import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';
import { makeGetInterventionExpenseUseCase } from '@/use-cases/_factories/interventions_factories/intervention_expenses_factories/make-get-intervention-expense-use-case';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';

export async function deleteInterventionExpense(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteInterventionExpenseQuerySchema = z.object({
    interventionExpenseId: z.string(),
    interventionId: z.string(),
  });

  const { interventionExpenseId, interventionId } =
    deleteInterventionExpenseQuerySchema.parse(request.params);

  try {
    const deleteInterventionExpenseUseCase =
      makeDeleteInterventionExpenseUseCase();

    const getInterventionExpenseUseCase = makeGetInterventionExpenseUseCase();
    const getInterventionUseCase = makeGetInterventionUseCase();
    const updateInterventionUseCase = makeUpdateInterventionUseCase();

    const { intervention } = await getInterventionUseCase.execute({
      interventionId,
    });

    const { interventionExpense } = await getInterventionExpenseUseCase.execute(
      {
        interventionExpenseId,
      },
    );

    if (intervention.total_value !== null) {
      await updateInterventionUseCase.execute({
        interventionId: interventionId,
        data: {
          total_value:
            intervention.total_value - interventionExpense.expense_value,
        },
      });
    }

    await deleteInterventionExpenseUseCase.execute({
      interventionExpenseId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
