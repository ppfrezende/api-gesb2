import { makeUpdatePurchaseOrdersUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-update-purchase-order-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

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
    over_days: z.number().optional(),
    time_onshore: z.string().optional(),
    time_offshore: z.string().optional(),
    time_travel: z.string().optional(),
    isMonthly: z.boolean().optional(),
    whatsCalendar: z.string().optional(),
    currency: z.string().optional(),
    expense_administration_tax: z.number().optional(),
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
    over_days,
    time_onshore,
    time_offshore,
    time_travel,
    isMonthly,
    whatsCalendar,
    currency,
    expense_administration_tax,
  } = updatePurchaseOrderBodySchema.parse(request.body);

  const { purchaseOrderId } = updatePurchaseOrderQuerySchema.parse(
    request.params,
  );

  try {
    const updatePurchaseOrder = makeUpdatePurchaseOrdersUseCase();

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
        over_days,
        time_onshore,
        time_offshore,
        time_travel,
        isMonthly,
        whatsCalendar,
        currency,
        expense_administration_tax,
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
