import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteTechnicianExpenseUseCase } from '@/use-cases/_factories/technicians_factories/technician_expenses_factories/make-delete-technician-expense-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function deleteTechnicianExpense(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteTechnicianExpenseQuerySchema = z.object({
    technicianExpenseId: z.string(),
  });

  const { technicianExpenseId } = deleteTechnicianExpenseQuerySchema.parse(
    request.params,
  );

  const getUserProfile = makeGetUserProfileUseCase();

  const { user: userLoggedIn } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  try {
    const deleteTechnicianExpenseUseCase = makeDeleteTechnicianExpenseUseCase();

    await deleteTechnicianExpenseUseCase.execute({
      technicianExpenseId,
      deletedBy: userLoggedIn.name,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
