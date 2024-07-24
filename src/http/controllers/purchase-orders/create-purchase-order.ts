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
    factor_HN_onshore: z.number(),
    factor_HN_offshore: z.number(),
    factor_holiday_onshore: z.number(),
    factor_holiday_offshore: z.number(),
    factor_night_onshore: z.number(),
    factor_night_offshore: z.number(),
    over_days: z.number(),
    time_onshore: z.string(),
    time_offshore: z.string(),
    time_travel: z.string(),
    isMonthly: z.boolean(),
    whatsCalendar: z.string(),
    currency: z.string(),
    expense_administration_tax: z.number(),
    skills: z.array(
      z.object({
        skill_description: z.string(),
        travel_hour: z.number(),
        normal_hour: z.number(),
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
    factor_HN_onshore,
    factor_HN_offshore,
    factor_holiday_onshore,
    factor_holiday_offshore,
    factor_night_onshore,
    factor_night_offshore,
    over_days,
    time_onshore,
    time_offshore,
    time_travel,
    isMonthly,
    whatsCalendar,
    currency,
    expense_administration_tax,
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
      factor_HN_onshore,
      factor_HN_offshore,
      factor_holiday_onshore,
      factor_holiday_offshore,
      factor_night_onshore,
      factor_night_offshore,
      over_days,
      time_onshore,
      time_offshore,
      time_travel,
      isMonthly,
      whatsCalendar,
      currency,
      expense_administration_tax,
      userName: user.name,
    });

    for (const skill of skills) {
      const { skill_description, travel_hour, normal_hour } = skill;

      await createSkill.execute({
        id_PO: purchase_order.id,
        skill_description,
        travel_hour,
        normal_hour,
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
