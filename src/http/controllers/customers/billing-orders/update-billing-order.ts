import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateBillingOrderUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-update-purchase-order-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function updateBillingOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateBillingOrderBodySchema = z.object({
    description: z.string().optional(),
    isDoubled: z.boolean().optional(),
    over_days: z.number().optional(),
    onshore_travel_hour_value: z.number().optional(),
    onshore_normal_hour_value: z.number().optional(),
    onshore_extra_hour_value: z.number().optional(),
    onshore_double_hour_value: z.number().optional(),
    onshore_night_hour_value: z.number().optional(),
    onshore_over_hour_value: z.number().optional(),
    offshore_travel_hour_value: z.number().optional(),
    offshore_normal_hour_value: z.number().optional(),
    offshore_extra_hour_value: z.number().optional(),
    offshore_double_hour_value: z.number().optional(),
    offshore_night_hour_value: z.number().optional(),
    offshore_over_hour_value: z.number().optional(),
    max_hours_day_onshore: z.number().optional(),
    max_hours_day_offshore: z.number().optional(),
    max_hours_day_travel: z.number().optional(),
    whatsCalendar: z.string().optional(),
  });

  const updateBillingOrderQuerySchema = z.object({
    billingOrderId: z.string(),
  });

  const {
    description,
    isDoubled,
    over_days,
    onshore_travel_hour_value,
    onshore_normal_hour_value,
    onshore_extra_hour_value,
    onshore_double_hour_value,
    onshore_night_hour_value,
    onshore_over_hour_value,
    offshore_travel_hour_value,
    offshore_normal_hour_value,
    offshore_extra_hour_value,
    offshore_double_hour_value,
    offshore_night_hour_value,
    offshore_over_hour_value,
    max_hours_day_onshore,
    max_hours_day_offshore,
    max_hours_day_travel,
    whatsCalendar,
  } = updateBillingOrderBodySchema.parse(request.body);

  const { billingOrderId } = updateBillingOrderQuerySchema.parse(
    request.params,
  );

  try {
    const updateBillingOrder = makeUpdateBillingOrderUseCase();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const updatedBillingOrder = await updateBillingOrder.execute({
      billingOrderId: billingOrderId,
      updatedBy: userLoggedIn.name,
      data: {
        description,
        isDoubled,
        over_days,
        onshore_travel_hour_value,
        onshore_normal_hour_value,
        onshore_extra_hour_value,
        onshore_double_hour_value,
        onshore_night_hour_value,
        onshore_over_hour_value,
        offshore_travel_hour_value,
        offshore_normal_hour_value,
        offshore_extra_hour_value,
        offshore_double_hour_value,
        offshore_night_hour_value,
        offshore_over_hour_value,
        max_hours_day_onshore,
        max_hours_day_offshore,
        max_hours_day_travel,
        whatsCalendar,
      },
    });
    return reply.status(201).send(updatedBillingOrder);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
