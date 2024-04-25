import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateSkillUseCase } from '@/use-cases/_factories/skills_factories/make-update-skill-use-case';

export async function updateSkill(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateSkillBodySchema = z.object({
    skill_description: z.string().optional(),
    travel_hour: z.number().optional(),
    normal_hour: z.number().optional(),
  });

  const updateSkillQuerySchema = z.object({
    skillId: z.string(),
  });

  const { skill_description, normal_hour, travel_hour } =
    updateSkillBodySchema.parse(request.body);

  const { skillId } = updateSkillQuerySchema.parse(request.params);

  try {
    const updateSkillUseCase = makeUpdateSkillUseCase();

    const updatedSkill = await updateSkillUseCase.execute({
      skillId,
      data: {
        skill_description,
        normal_hour,
        travel_hour,
      },
    });

    return reply.status(201).send({
      updatedSkill,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
