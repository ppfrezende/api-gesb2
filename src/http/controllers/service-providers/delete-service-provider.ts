import { makeDeleteServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-delete-service-provider-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteServiceProviderProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteServiceProviderProfileQuerySchema = z.object({
    serviceProviderId: z.string(),
  });

  const { serviceProviderId } = deleteServiceProviderProfileQuerySchema.parse(
    request.params,
  );

  try {
    const deleteServiceProviderProfile =
      makeDeleteServiceProviderProfileUseCase();

    await deleteServiceProviderProfile.execute({
      serviceProviderId: serviceProviderId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
