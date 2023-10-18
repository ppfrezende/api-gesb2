import { makeUpdatePurchaseOrdersUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-update-purchase-order-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetSkillsByPOUseCase } from '@/use-cases/_factories/skills_factories/make-get-skill-by-po-use-case';
import { makeDeleteSkillUseCase } from '@/use-cases/_factories/skills_factories/make-delete-skill-use-case';
import { makeCreateSkillUseCase } from '@/use-cases/_factories/skills_factories/make-create-skill-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function updatePurchaseOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePurchaseOrderBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    factor_HE_onshore: z.number().optional(),
    factor_HE_offshore: z.number().optional(),
    factor_HN_onshore: z.number().optional(),
    factor_HN_offshore: z.number().optional(),
    factor_holiday: z.number().optional(),
    factor_night: z.number().optional(),
    factor_over_xd: z.number().optional(),
    time_onshore: z.number().optional(),
    time_offshore: z.number().optional(),
    time_travel: z.number().optional(),
    isMonthly: z.boolean().optional(),
    whatsCalendar: z.number().optional(),
    currency: z.string().optional(),
    adictional: z.number().optional(),
    skills: z
      .array(
        z.object({
          skill_description: z.string().optional(),
          travel_hour: z.number().optional(),
          normal_hour: z.number().optional(),
        }),
      )
      .optional(),
  });

  const updatePurchaseOrderQuerySchema = z.object({
    purchaseOrderId: z.string(),
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
    factor_HN_onshore,
    factor_HN_offshore,
    factor_holiday,
    factor_night,
    factor_over_xd,
    time_onshore,
    time_offshore,
    time_travel,
    isMonthly,
    whatsCalendar,
    currency,
    adictional,
    skills,
  } = updatePurchaseOrderBodySchema.parse(request.body);

  const { purchaseOrderId } = updatePurchaseOrderQuerySchema.parse(
    request.params,
  );

  try {
    const updatePurchaseOrder = makeUpdatePurchaseOrdersUseCase();
    const getSkillByPO = makeGetSkillsByPOUseCase();
    const deleteSkill = makeDeleteSkillUseCase();
    const createSkill = makeCreateSkillUseCase();

    const { purchaseOrderSkills } = await getSkillByPO.execute({
      id_PO: purchaseOrderId,
    });

    if (purchaseOrderSkills) {
      for (const skill of purchaseOrderSkills) {
        const { id } = skill;

        await deleteSkill.execute({
          skillId: id,
        });
      }
    }

    if (skills) {
      for (const skill of skills) {
        const { skill_description, travel_hour, normal_hour } = skill;

        await createSkill.execute({
          id_PO: purchaseOrderId,
          skill_description,
          travel_hour,
          normal_hour,
          userName: user.name,
        });
      }
    }

    const updatedPurchaseOrder = await updatePurchaseOrder.execute({
      purchaseOrderId: purchaseOrderId,
      data: {
        name,
        description,
        factor_HE_onshore,
        factor_HE_offshore,
        factor_HN_onshore,
        factor_HN_offshore,
        factor_holiday,
        factor_night,
        factor_over_xd,
        time_onshore,
        time_offshore,
        time_travel,
        isMonthly,
        whatsCalendar,
        currency,
        adictional,
      },
    });

    return reply.status(201).send(updatedPurchaseOrder);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
