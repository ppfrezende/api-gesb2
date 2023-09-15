import { makeDeleteProjectUseCase } from '@/use-cases/_factories/project-factories/make-delete-project-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteProjectQuerySchema = z.object({
    projectId: z.string(),
  });

  const { projectId } = deleteProjectQuerySchema.parse(request.params);

  try {
    const deleteProjectUseCase = makeDeleteProjectUseCase();

    await deleteProjectUseCase.execute({
      projectId: projectId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
