import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteCustomerUseCase } from '@/use-cases/_factories/customers_factories/make-delete-customer-use-case';
import { makeGetInterventionByCustomerUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-customer-use-case';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function deleteCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCustomerQuerySchema = z.object({
    customerId: z.string(),
  });

  const { customerId } = deleteCustomerQuerySchema.parse(request.params);

  try {
    const deleteCustomer = makeDeleteCustomerUseCase();
    const getInterventionByCustomerUseCase =
      makeGetInterventionByCustomerUseCase();
    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const isLinked = await getInterventionByCustomerUseCase.execute({
      customerId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteCustomer.execute({
        customerId,
        deletedBy: userLoggedIn.name,
      });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ResourceCannotBeDeletedError) {
      return reply.status(403).send({ message: err.message });
    }

    throw err;
  }
}
