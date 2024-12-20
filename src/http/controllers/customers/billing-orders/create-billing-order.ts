import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateBillingOrderUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-create-billing-order';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';

export async function createBillingOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBillingOrderBodySchema = z.object({
    description: z.string(),
    isDoubled: z.boolean(),
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
    whatsCalendar: z.string(),
  });

  const createBillingOrderQuerySchema = z.object({
    customerId: z.string(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
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
  } = createBillingOrderBodySchema.parse(request.body);

  const { customerId } = createBillingOrderQuerySchema.parse(request.params);

  try {
    const createBillingOrder = makeCreateBillingOrderUseCase();

    const { billing_order } = await createBillingOrder.execute({
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

      customerId,
      userId: user.id,
    });

    return reply.status(201).send({
      billing_order,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
