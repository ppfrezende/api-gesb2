import { makeUpdatePurchaseOrdersUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-update-purchase-order-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetSkillsByPOUseCase } from '@/use-cases/_factories/skills_factories/make-get-skill-by-po-use-case';
import { makeCreateSkillUseCase } from '@/use-cases/_factories/skills_factories/make-create-skill-use-case';
import { makeUpdateSkillUseCase } from '@/use-cases/_factories/skills_factories/make-update-skill-use-case';

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
    factor_holiday_onshore: z.number().optional(),
    factor_holiday_offshore: z.number().optional(),
    factor_night_onshore: z.number().optional(),
    factor_night_offshore: z.number().optional(),
    factor_over_xd: z.number().optional(),
    time_onshore: z.string().optional(),
    time_offshore: z.string().optional(),
    time_travel: z.string().optional(),
    isMonthly: z.boolean().optional(),
    whatsCalendar: z.string().optional(),
    currency: z.string().optional(),
    adictional: z.number().optional(),
    skills: z
      .array(
        z.object({
          id: z.string().optional(),
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

  const {
    name,
    description,
    factor_HE_onshore,
    factor_HE_offshore,
    factor_HN_onshore,
    factor_HN_offshore,
    factor_holiday_onshore,
    factor_holiday_offshore,
    factor_night_onshore,
    factor_night_offshore,
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
    const updateSkill = makeUpdateSkillUseCase();
    const createSkill = makeCreateSkillUseCase();

    const { purchaseOrderSkills } = await getSkillByPO.execute({
      id_PO: purchaseOrderId,
    });

    const skillsFromBody = skills;

    if (skillsFromBody) {
      for (const skill of skillsFromBody) {
        const existingSkill = purchaseOrderSkills.find(
          (purchaseOrderSkill) => purchaseOrderSkill.id === skill.id,
        );

        if (existingSkill) {
          await updateSkill.execute({
            skillId: existingSkill.id,
            data: {
              skill_description: skill.skill_description,
              normal_hour: skill.normal_hour,
              travel_hour: skill.travel_hour,
            },
          });
        } else {
          const { skill_description, travel_hour, normal_hour } = skill;
          await createSkill.execute({
            id_PO: purchaseOrderId,
            skill_description,
            travel_hour,
            normal_hour,
          });
        }
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
        factor_holiday_onshore,
        factor_holiday_offshore,
        factor_night_onshore,
        factor_night_offshore,
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
