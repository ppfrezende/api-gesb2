import { makeGetProjectUseCase } from '@/use-cases/_factories/project-factories/make-get-project-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getProject(request: FastifyRequest, reply: FastifyReply) {
  const getProjectQuerySchema = z.object({
    projectId: z.string(),
  });

  const { projectId } = getProjectQuerySchema.parse(request.params);
  try {
    const getProject = makeGetProjectUseCase();

    const { project } = await getProject.execute({
      projectId: projectId,
    });

    return reply.status(200).send({
      project,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
