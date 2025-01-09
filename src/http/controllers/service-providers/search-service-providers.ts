import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeSearchServiceProviderUseCase } from '@/use-cases/_factories/service-providers_factories/make-search-service-providers-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function searchServiceProviders(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchServiceProvidersQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchServiceProvidersQuerySchema.parse(request.query);

  try {
    const searchServiceProvidersUseCase = makeSearchServiceProviderUseCase();

    const { service_providers, numberOfRegisters } =
      await searchServiceProvidersUseCase.execute({
        query: q,
        page,
      });

    return reply
      .status(200)
      .headers({
        'x-page-count': numberOfRegisters,
      })
      .send({ service_providers });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
