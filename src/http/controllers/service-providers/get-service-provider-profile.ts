import { makeGetServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-get-service-provider-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getServiceProviderProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getServiceProviderProfileQuerySchema = z.object({
    serviceProviderId: z.string(),
  });

  const { serviceProviderId } = getServiceProviderProfileQuerySchema.parse(
    request.params,
  );
  try {
    const getServiceProviderProfile = makeGetServiceProviderProfileUseCase();

    const { service_provider } = await getServiceProviderProfile.execute({
      serviceProviderId: serviceProviderId,
    });

    return reply.status(200).send({
      service_provider,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
