import { makeUpdateUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-update-user-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { hash } from 'bcryptjs';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const roleValues = [
    'ADMIN',
    'SERVICE',
    'RH',
    'FINANCE',
    'COMERCIAL',
    'GUEST',
  ] as const;

  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    sector: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(roleValues).optional(),
  });

  const updateUserProfileQuerySchema = z.object({
    id: z.string(),
  });

  const { name, email, sector, password, role } = updateUserBodySchema.parse(
    request.body,
  );
  const { id } = updateUserProfileQuerySchema.parse(request.params);

  try {
    const updateUserProfile = makeUpdateUserProfileUseCase();

    let newPasswordHashed;
    if (password) {
      newPasswordHashed = await hash(password, 6);
    }

    await updateUserProfile.execute({
      userId: id,
      data: {
        name,
        email,
        sector,
        password_hash: newPasswordHashed,
        role,
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
