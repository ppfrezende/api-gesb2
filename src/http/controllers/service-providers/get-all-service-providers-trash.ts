import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetServiceProvidersTrashUseCase } from '@/use-cases/_factories/service-providers_factories/make-get-all-service-providers-trash-use-case';

export async function getServiceProvidersTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getServiceProvidersTrashListUseCase =
      makeGetServiceProvidersTrashUseCase();

    const { service_providers, totalCount } =
      await getServiceProvidersTrashListUseCase.execute();

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })

      .send({ service_providers });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
