import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateSkillUseCase } from '@/use-cases/_factories/skills_factories/make-create-skill-use-case';

export async function createSkill(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSkillBodySchema = z.object({
    skill_description: z.string(),
    travel_hour: z.number(),
    normal_hour: z.number(),
  });

  const getPurchaseOrderQuerySchema = z.object({
    purchaseOrderId: z.string(),
  });

  const { skill_description, travel_hour, normal_hour } =
    createSkillBodySchema.parse(request.body);

  const { purchaseOrderId } = getPurchaseOrderQuerySchema.parse(request.params);

  try {
    const createSkill = makeCreateSkillUseCase();

    const skill = await createSkill.execute({
      id_PO: purchaseOrderId,
      skill_description,
      travel_hour,
      normal_hour,
    });

    return reply.status(201).send({
      skill,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
