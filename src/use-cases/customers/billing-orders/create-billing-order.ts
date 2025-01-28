import { BillingOrdersRepository } from '@/repositories/billing-orders-repository';
import { BillingOrder } from '@prisma/client';

interface CreateBillingOrderUseCaseRequest {
  description: string;
  isOffshore: boolean;
  over_days?: number;
  currency: string;
  expense_administration_tax: number;
  travel_hour_value?: number;
  onshore_normal_hour_value?: number;
  onshore_extra_hour_value?: number;
  onshore_night_hour_value?: number;
  onshore_over_hour_value?: number;
  offshore_normal_hour_value?: number;
  offshore_extra_hour_value?: number;
  offshore_night_hour_value?: number;
  offshore_over_hour_value?: number;
  max_hours_day_onshore?: number;
  max_hours_day_offshore?: number;
  max_hours_day_travel?: number;
  whatsCalendar: string;
  userId: string;
  customerId: string;
}

interface CreateBillingOrderUseCaseResponse {
  billing_order: BillingOrder;
}

export class CreateBillingOrderUseCase {
  constructor(private billingOrderRepository: BillingOrdersRepository) {}

  async execute({
    description,
    isOffshore,
    over_days,
    currency,
    expense_administration_tax,
    travel_hour_value,
    onshore_normal_hour_value,
    onshore_extra_hour_value,
    onshore_night_hour_value,
    onshore_over_hour_value,
    offshore_normal_hour_value,
    offshore_extra_hour_value,
    offshore_night_hour_value,
    offshore_over_hour_value,
    max_hours_day_onshore,
    max_hours_day_offshore,
    max_hours_day_travel,
    whatsCalendar,
    customerId,
    userId,
  }: CreateBillingOrderUseCaseRequest): Promise<CreateBillingOrderUseCaseResponse> {
    const billing_order = await this.billingOrderRepository.create({
      description,
      isOffshore,
      over_days,
      currency,
      expense_administration_tax,
      travel_hour_value,
      onshore_normal_hour_value,
      onshore_extra_hour_value,
      onshore_night_hour_value,
      onshore_over_hour_value,
      offshore_normal_hour_value,
      offshore_extra_hour_value,
      offshore_night_hour_value,
      offshore_over_hour_value,
      max_hours_day_onshore,
      max_hours_day_offshore,
      max_hours_day_travel,
      whatsCalendar,
      customerId,
      userId,
    });

    return {
      billing_order,
    };
  }
}
