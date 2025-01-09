import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeSearchUserUseCase } from '@/use-cases/_factories/user_factories/make-search-user-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function searchUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchUserQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchUserQuerySchema.parse(request.query);

  try {
    const searchUserUseCase = makeSearchUserUseCase();

    const { users, numberOfRegisters } = await searchUserUseCase.execute({
      query: q,
      page,
    });

    return reply
      .status(200)
      .headers({
        'x-page-count': numberOfRegisters,
      })
      .send({ users });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
