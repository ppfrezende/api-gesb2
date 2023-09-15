import { makeDeleteUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-delete-user-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteUserProfileQuerySchema = z.object({
    id: z.string(),
  });

  const { id } = deleteUserProfileQuerySchema.parse(request.params);

  try {
    const deleteUserProfile = makeDeleteUserProfileUseCase();

    await deleteUserProfile.execute({
      userId: id,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
