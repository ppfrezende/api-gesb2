import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateBillingOrderUseCase } from '@/use-cases/_factories/customers_factories/billing-orders_factories/make-update-purchase-order-use-case';

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
    currency: z.string().optional(),
    expense_administration_tax: z.number().optional(),
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
    currency,
    expense_administration_tax,
  } = updateBillingOrderBodySchema.parse(request.body);

  const { billingOrderId } = updateBillingOrderQuerySchema.parse(
    request.params,
  );

  try {
    const updateBillingOrder = makeUpdateBillingOrderUseCase();

    const updatedBillingOrder = await updateBillingOrder.execute({
      billingOrderId: billingOrderId,
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
        currency,
        expense_administration_tax,
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
