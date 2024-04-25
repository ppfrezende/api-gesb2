import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
import { makeDeleteSkillUseCase } from '@/use-cases/_factories/skills_factories/make-delete-skill-use-case';
import { makeGetInterventionBySkillUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-skill-use-case';

export async function deleteSkill(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteSkillQuerySchema = z.object({
    skillId: z.string(),
  });

  const { skillId } = deleteSkillQuerySchema.parse(request.params);

  try {
    const deleteSkillUseCase = makeDeleteSkillUseCase();
    const getInterventionBySkillUseCase = makeGetInterventionBySkillUseCase();

    const isLinked = await getInterventionBySkillUseCase.execute({
      skillId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteSkillUseCase.execute({
        skillId,
      });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ResourceCannotBeDeletedError) {
      return reply.status(403).send({ message: err.message });
    }

    throw err;
  }
}
