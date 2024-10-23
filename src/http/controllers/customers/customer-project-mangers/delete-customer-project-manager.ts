import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
import { makeDeleteProjectManagerUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-delete-project-manager-use-case';
import { makeGetInterventionByCustomerProjectManagerUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-customer-project-manager-use-case';

export async function deleteCustomerProjectManager(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCustomerProjectManagerQuerySchema = z.object({
    customerProjectManagerId: z.string(),
  });

  const { customerProjectManagerId } =
    deleteCustomerProjectManagerQuerySchema.parse(request.params);

  try {
    const deleteProjectManagerUseCase = makeDeleteProjectManagerUseCase();
    const getInterventionByCustomerProjectManagerUseCase =
      makeGetInterventionByCustomerProjectManagerUseCase();

    const isLinked =
      await getInterventionByCustomerProjectManagerUseCase.execute({
        customerProjectManagerId,
      });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteProjectManagerUseCase.execute({
        customerProjectManagerId,
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
