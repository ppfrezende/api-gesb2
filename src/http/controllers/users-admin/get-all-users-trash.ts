import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetAllUsersTrashUseCaseRepository } from '@/use-cases/_factories/user_factories/make-get-all-users-trash-use-case';

export async function getAllUsersTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getUsersTrashUseCase = makeGetAllUsersTrashUseCaseRepository();

    const { users, totalCount } = await getUsersTrashUseCase.execute();

    return reply
      .status(200)
      .headers({
        'x-total-count': totalCount,
      })

      .send({ users });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
