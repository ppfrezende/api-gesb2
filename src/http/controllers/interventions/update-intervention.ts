import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeGetEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-get-employee-profile-use-case';
import { makeGetServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-get-service-provider-use-case';
import { makeGetPurchaseOrderUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-get-purchase-order-use-case';

type Data = {
  description?: string;
  customer_email?: string;
  initial_at?: Date;
  finished_at?: Date;
  purchaseOrderId?: string;
  employeeId?: string;
  serviceProviderId?: string;
  siteId?: string;
  userEmail?: string;
};

export async function updateIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateInterventionBodySchema = z.object({
    description: z.string().optional(),
    customer_email: z.string().optional(),
    initial_at: z.coerce.date().optional(),
    finished_at: z.coerce.date().optional(),
    purchaseOrderId: z.string().optional(),
    employeeId: z.string().optional(),
    serviceProviderId: z.string().optional(),
    siteId: z.string().optional(),
  });

  const updateInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const { interventionId } = updateInterventionQuerySchema.parse(
    request.params,
  );

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    description,
    customer_email,
    initial_at,
    finished_at,
    purchaseOrderId,
    employeeId,
    serviceProviderId,
    siteId,
  } = updateInterventionBodySchema.parse(request.body);
  const getPurchaseOrder = makeGetPurchaseOrderUseCase();
  const getEmployee = makeGetEmployeeProfileUseCase();
  const getServiceProvider = makeGetServiceProviderProfileUseCase();
  const updateIntervention = makeUpdateInterventionUseCase();

  const data: Data = {
    description,
    customer_email,
    initial_at,
    finished_at,
    purchaseOrderId,
    employeeId,
    serviceProviderId,
    siteId,
    userEmail: user.email,
  };

  if (purchaseOrderId) {
    const { purchase_order } = await getPurchaseOrder.execute({
      purchaseOrderId,
    });
    data.purchaseOrderId = purchase_order.id;
  }

  if (employeeId) {
    const { employee } = await getEmployee.execute({
      employeeId,
    });
    data.employeeId = employee.id;
  } else if (serviceProviderId) {
    const { service_provider } = await getServiceProvider.execute({
      serviceProviderId,
    });
    data.serviceProviderId = service_provider.id;
  }

  try {
    const intervention = await updateIntervention.execute({
      interventionId,
      data,
    });

    return reply.status(201).send({
      intervention,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
