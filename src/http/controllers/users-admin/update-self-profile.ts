import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeUpdateUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-update-user-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { hash } from 'bcryptjs';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateSelfProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const updateSelfProfileBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  });

  const { name, email, password } = updateSelfProfileBodySchema.parse(
    request.body,
  );

  try {
    const updateUserProfile = makeUpdateUserProfileUseCase();

    let newPasswordHashed;
    if (password) {
      newPasswordHashed = await hash(password, 6);
    }

    await updateUserProfile.execute({
      userId: user.id,
      data: {
        name,
        email,
        password_hash: newPasswordHashed,
      },
    });

    return reply.status(200).send({ message: 'successfully updated' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
