import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeCreatePurchaseOrderUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-create-purchase-order';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateSkillUseCase } from '@/use-cases/_factories/skills_factories/make-create-skill-use-case';

export async function createPurchaseOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPurchaseOrderBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    factor_HE_onshore: z.number(),
    factor_HE_offshore: z.number(),
    factor_HN: z.number(),
    day_H_before_extra_onshore: z.number(),
    day_H_before_extra_offshore: z.number(),
    skills: z.array(
      z.object({
        skill_description: z.string(),
        HN_onshore: z.number(),
        HN_offshore: z.number(),
      }),
    ),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    name,
    description,
    factor_HE_onshore,
    factor_HE_offshore,
    factor_HN,
    day_H_before_extra_onshore,
    day_H_before_extra_offshore,
    skills,
  } = createPurchaseOrderBodySchema.parse(request.body);

  try {
    const createPurchaseOrder = makeCreatePurchaseOrderUseCase();
    const createSkill = makeCreateSkillUseCase();

    const { purchase_order } = await createPurchaseOrder.execute({
      name,
      description,
      factor_HE_onshore,
      factor_HE_offshore,
      factor_HN,
      day_H_before_extra_onshore,
      day_H_before_extra_offshore,
      userEmail: user.email,
    });

    for (const skill of skills) {
      const { skill_description, HN_onshore, HN_offshore } = skill;

      await createSkill.execute({
        id_PO: purchase_order.id,
        skill_description,
        HN_onshore,
        HN_offshore,
        userEmail: user.email,
      });
    }

    return reply.status(201).send({
      purchase_order,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
