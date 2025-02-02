import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetServiceProvidersListUseCase } from '@/use-cases/_factories/service-providers_factories/make-get-service-providers-list-use-case';

export async function getServiceProvidersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getServiceProvidersQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    isActive: z.string(),
  });

  const { isActive, page } = getServiceProvidersQuerySchema.parse(
    request.query,
  );

  try {
    const getServiceProvidersListUseCase = makeGetServiceProvidersListUseCase();
    const isActiveFilter = isActive === 'true';

    const { service_providers, numberOfRegisters, totalCount } =
      await getServiceProvidersListUseCase.execute({
        page,
        isActive: isActiveFilter,
      });

    return reply
      .status(200)
      .headers({ 'x-page-count': numberOfRegisters })
      .headers({ 'x-total-count': totalCount })

      .send({ service_providers });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
