import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetProjectsUseCase } from '@/use-cases/_factories/project-factories/make-get-projects-list-use-case';

export async function getProjectsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEmployeesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getEmployeesQuerySchema.parse(request.query);

  try {
    const getProjectsListUseCase = makeGetProjectsUseCase();

    const { projects, numberOfRegisters } =
      await getProjectsListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ projects });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
