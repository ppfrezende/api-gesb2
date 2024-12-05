import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists';
import { makeRegisterUserUseCase } from '@/use-cases/_factories/user_factories/make-register-user-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function registerUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const roleValues = [
    'ADMIN',
    'SERVICE',
    'RH',
    'FINANCE',
    'GUEST',
    'COMERCIAL',
  ] as const;

  const registerBodySchema = z.object({
    name: z.string(),
    sector: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(roleValues),
  });

  const { name, sector, email, password, role } = registerBodySchema.parse(
    request.body,
  );

  try {
    const regiterUserUseCase = makeRegisterUserUseCase();

    const { user } = await regiterUserUseCase.execute({
      name,
      sector,
      email,
      password,
      role,
    });

    return reply.status(201).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
