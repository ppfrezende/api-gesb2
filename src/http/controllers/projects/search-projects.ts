import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeSearchProjectsUseCase } from '@/use-cases/_factories/project-factories/make-search-projects-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function searchProjects(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchProjectsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchProjectsQuerySchema.parse(request.query);

  try {
    const searchEmployeeUseCase = makeSearchProjectsUseCase();

    const projects = await searchEmployeeUseCase.execute({
      query: q,
      page,
    });

    return reply.status(200).send({
      projects,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
